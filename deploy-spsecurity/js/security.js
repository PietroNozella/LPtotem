/**
 * SP Security - Security Module
 * Protection against XSS, injection, and other vulnerabilities
 */

(function() {
    'use strict';
    
    // ===== Security Utilities =====
    window.SecurityUtils = {
        
        /**
         * Validate hexadecimal color format
         * @param {string} color - Color to validate
         * @returns {boolean} - True if valid hex color
         */
        isValidHexColor: function(color) {
            if (typeof color !== 'string') return false;
            return /^#[0-9A-Fa-f]{6}$/.test(color);
        },
        
        /**
         * Sanitize hex color - returns default if invalid
         * @param {string} color - Color to sanitize
         * @param {string} defaultColor - Default color if invalid
         * @returns {string} - Sanitized color
         */
        sanitizeHexColor: function(color, defaultColor) {
            defaultColor = defaultColor || '#1a1a2e';
            if (!color) return defaultColor;
            
            // Remove any whitespace
            color = color.trim();
            
            // Add # if missing
            if (!color.startsWith('#')) {
                color = '#' + color;
            }
            
            // Validate format
            if (this.isValidHexColor(color)) {
                return color.toLowerCase();
            }
            
            return defaultColor;
        },
        
        /**
         * Escape HTML to prevent XSS
         * @param {string} str - String to escape
         * @returns {string} - Escaped string
         */
        escapeHtml: function(str) {
            if (typeof str !== 'string') return '';
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            };
            return str.replace(/[&<>"'`=\/]/g, function(s) {
                return map[s];
            });
        },
        
        /**
         * Sanitize URL parameters
         * @param {string} param - Parameter to sanitize
         * @returns {string} - Sanitized parameter
         */
        sanitizeUrlParam: function(param) {
            if (typeof param !== 'string') return '';
            // Remove any potentially dangerous characters
            return param.replace(/[<>'"&\\]/g, '');
        },
        
        /**
         * Validate URL format
         * @param {string} url - URL to validate
         * @returns {boolean} - True if valid URL
         */
        isValidUrl: function(url) {
            try {
                const parsed = new URL(url);
                return ['http:', 'https:'].includes(parsed.protocol);
            } catch (e) {
                return false;
            }
        },
        
        /**
         * Generate safe WhatsApp URL
         * @param {string} phone - Phone number
         * @param {string} message - Message to send
         * @returns {string} - Safe WhatsApp URL
         */
        generateWhatsAppUrl: function(phone, message) {
            // Validate phone (only numbers)
            const cleanPhone = phone.replace(/\D/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 15) {
                console.warn('Invalid phone number');
                return '#';
            }
            
            // Encode message safely
            const safeMessage = encodeURIComponent(message);
            
            return `https://wa.me/${cleanPhone}?text=${safeMessage}`;
        }
    };
    
    // ===== Rate Limiting =====
    const RateLimiter = {
        actions: {},
        
        /**
         * Check if action is allowed (rate limiting)
         * @param {string} actionName - Name of the action
         * @param {number} maxAttempts - Maximum attempts allowed
         * @param {number} windowMs - Time window in milliseconds
         * @returns {boolean} - True if action is allowed
         */
        isAllowed: function(actionName, maxAttempts, windowMs) {
            maxAttempts = maxAttempts || 10;
            windowMs = windowMs || 60000; // 1 minute default
            
            const now = Date.now();
            
            if (!this.actions[actionName]) {
                this.actions[actionName] = [];
            }
            
            // Remove old entries
            this.actions[actionName] = this.actions[actionName].filter(
                time => now - time < windowMs
            );
            
            // Check if allowed
            if (this.actions[actionName].length >= maxAttempts) {
                console.warn(`Rate limit exceeded for: ${actionName}`);
                return false;
            }
            
            // Record this action
            this.actions[actionName].push(now);
            return true;
        },
        
        /**
         * Reset rate limiter for an action
         * @param {string} actionName - Name of the action
         */
        reset: function(actionName) {
            delete this.actions[actionName];
        }
    };
    
    window.RateLimiter = RateLimiter;
    
    // ===== DOM Security =====
    document.addEventListener('DOMContentLoaded', function() {
        
        // Prevent clickjacking by checking if in iframe
        if (window.self !== window.top) {
            // We're in an iframe - this shouldn't happen
            document.body.innerHTML = '<h1>Acesso não autorizado</h1>';
            console.error('Clickjacking attempt detected');
            return;
        }
        
        // Disable right-click on sensitive areas (optional, can be removed)
        // document.addEventListener('contextmenu', function(e) {
        //     e.preventDefault();
        // });
        
        // Monitor for devtools (optional warning)
        // This is just a deterrent, not a real security measure
        let devtoolsOpen = false;
        const threshold = 160;
        
        const checkDevTools = function() {
            if (window.outerWidth - window.innerWidth > threshold || 
                window.outerHeight - window.innerHeight > threshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    console.log('%c⚠️ SP Security', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
                    console.log('%cEste é um recurso do navegador para desenvolvedores.', 'font-size: 14px;');
                }
            } else {
                devtoolsOpen = false;
            }
        };
        
        // Check periodically (optional)
        // setInterval(checkDevTools, 1000);
        
        // Sanitize any user-generated content in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.forEach(function(value, key) {
            // Log any suspicious parameters
            if (value.includes('<') || value.includes('>') || value.includes('javascript:')) {
                console.warn('Suspicious URL parameter detected:', key);
            }
        });
        
    });
    
    // ===== Form Protection =====
    window.SecureForm = {
        /**
         * Validate and sanitize form data
         * @param {Object} formData - Form data object
         * @param {Object} rules - Validation rules
         * @returns {Object} - { valid: boolean, data: object, errors: array }
         */
        validate: function(formData, rules) {
            const errors = [];
            const sanitizedData = {};
            
            for (const field in rules) {
                const value = formData[field];
                const rule = rules[field];
                
                // Required check
                if (rule.required && !value) {
                    errors.push(`${field} é obrigatório`);
                    continue;
                }
                
                // Type check
                if (rule.type === 'color') {
                    sanitizedData[field] = SecurityUtils.sanitizeHexColor(value, rule.default);
                } else if (rule.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !emailRegex.test(value)) {
                        errors.push(`${field} não é um email válido`);
                    } else {
                        sanitizedData[field] = SecurityUtils.escapeHtml(value);
                    }
                } else if (rule.type === 'phone') {
                    const cleanPhone = value ? value.replace(/\D/g, '') : '';
                    if (cleanPhone && (cleanPhone.length < 10 || cleanPhone.length > 15)) {
                        errors.push(`${field} não é um telefone válido`);
                    } else {
                        sanitizedData[field] = cleanPhone;
                    }
                } else {
                    sanitizedData[field] = SecurityUtils.escapeHtml(value || '');
                }
                
                // Max length check
                if (rule.maxLength && value && value.length > rule.maxLength) {
                    errors.push(`${field} excede o limite de ${rule.maxLength} caracteres`);
                }
            }
            
            return {
                valid: errors.length === 0,
                data: sanitizedData,
                errors: errors
            };
        }
    };
    
    // ===== Console Warning =====
    console.log('%c⚠️ Atenção!', 'font-size: 20px; font-weight: bold; color: #ef4444;');
    console.log('%cEste é um recurso do navegador destinado a desenvolvedores. Se alguém pediu para você copiar e colar algo aqui, isso é uma fraude.', 'font-size: 14px; color: #666;');
    
})();
