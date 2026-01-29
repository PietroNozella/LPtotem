/**
 * SP Security - Totem Customizer
 * Interactive totem color customization
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomizer();
});

/**
 * Initialize the totem customizer
 */
function initCustomizer() {
    // Color configuration
    const defaultColors = {
        body: '#1a1a2e',
        accent: '#3b82f6',
        led: '#3b82f6',
        emblem: '#ffffff'
    };
    
    let currentColors = { ...defaultColors };
    
    // DOM Elements
    const elements = {
        // Color inputs
        bodyColor: document.getElementById('bodyColor'),
        accentColor: document.getElementById('accentColor'),
        ledColor: document.getElementById('ledColor'),
        emblemColor: document.getElementById('emblemColor'),
        
        // Color value displays
        bodyColorValue: document.getElementById('bodyColorValue'),
        accentColorValue: document.getElementById('accentColorValue'),
        ledColorValue: document.getElementById('ledColorValue'),
        emblemColorValue: document.getElementById('emblemColorValue'),
        
        // Summary swatches
        summaryBody: document.getElementById('summaryBody'),
        summaryAccent: document.getElementById('summaryAccent'),
        summaryLed: document.getElementById('summaryLed'),
        summaryEmblem: document.getElementById('summaryEmblem'),
        
        // SVG elements
        totemBody: document.querySelector('.totem-body'),
        totemHead: document.querySelector('.totem-head'),
        totemBase: document.querySelector('.totem-base'),
        totemBrandArea: document.querySelector('.totem-brand-area'),
        totemStripeLeft: document.querySelector('.totem-stripe-left'),
        totemStripeRight: document.querySelector('.totem-stripe-right'),
        totemLedGlow: document.querySelector('.totem-led-glow'),
        totemEmblem: document.querySelector('.totem-emblem'),
        totemDecorBottom: document.querySelector('.totem-decor-bottom'),
        totemDecorBottom2: document.querySelector('.totem-decor-bottom2'),
        cameraLeftLens: document.querySelector('.camera-left circle:last-child'),
        cameraRightLens: document.querySelector('.camera-right circle:last-child'),
        
        // Preview glow
        previewGlow: document.getElementById('previewGlow'),
        
        // Buttons
        resetBtn: document.getElementById('resetColors'),
        startProjectBtn: document.getElementById('startProject'),
        rotateLeftBtn: document.getElementById('rotateLeft'),
        rotateRightBtn: document.getElementById('rotateRight'),
        resetViewBtn: document.getElementById('resetView'),
        
        // Totem container
        totem3d: document.querySelector('.totem-3d')
    };
    
    // Current rotation state
    let currentRotation = 0;
    
    /**
     * Update totem colors based on current configuration
     */
    function updateTotem() {
        // Body color
        if (elements.totemBody) {
            elements.totemBody.setAttribute('fill', currentColors.body);
        }
        if (elements.totemHead) {
            elements.totemHead.setAttribute('fill', currentColors.body);
        }
        if (elements.totemBase) {
            elements.totemBase.setAttribute('fill', currentColors.body);
        }
        if (elements.totemBrandArea) {
            // Slightly darker than body
            elements.totemBrandArea.setAttribute('fill', adjustBrightness(currentColors.body, -20));
        }
        
        // Accent color (stripes, decorations)
        if (elements.totemStripeLeft) {
            elements.totemStripeLeft.setAttribute('fill', currentColors.accent);
        }
        if (elements.totemStripeRight) {
            elements.totemStripeRight.setAttribute('fill', currentColors.accent);
        }
        if (elements.totemDecorBottom) {
            elements.totemDecorBottom.setAttribute('stroke', currentColors.accent);
        }
        if (elements.totemDecorBottom2) {
            elements.totemDecorBottom2.setAttribute('stroke', currentColors.accent);
        }
        
        // LED color
        if (elements.totemLedGlow) {
            elements.totemLedGlow.setAttribute('fill', currentColors.led);
        }
        if (elements.cameraLeftLens) {
            elements.cameraLeftLens.setAttribute('fill', currentColors.led);
        }
        if (elements.cameraRightLens) {
            elements.cameraRightLens.setAttribute('fill', currentColors.led);
        }
        
        // Emblem color
        if (elements.totemEmblem) {
            elements.totemEmblem.setAttribute('fill', currentColors.emblem);
        }
        
        // Update preview glow
        if (elements.previewGlow) {
            elements.previewGlow.style.background = currentColors.accent;
        }
        
        // Update summary swatches
        updateSummary();
    }
    
    /**
     * Update the summary display
     */
    function updateSummary() {
        if (elements.summaryBody) {
            elements.summaryBody.style.backgroundColor = currentColors.body;
        }
        if (elements.summaryAccent) {
            elements.summaryAccent.style.backgroundColor = currentColors.accent;
        }
        if (elements.summaryLed) {
            elements.summaryLed.style.backgroundColor = currentColors.led;
        }
        if (elements.summaryEmblem) {
            elements.summaryEmblem.style.backgroundColor = currentColors.emblem;
        }
    }
    
    /**
     * Update color value display
     */
    function updateColorValue(inputId, value) {
        const valueElement = document.getElementById(`${inputId}Value`);
        if (valueElement) {
            valueElement.textContent = value.toUpperCase();
        }
    }
    
    /**
     * Handle color input change
     */
    function handleColorChange(colorKey, inputElement) {
        if (!inputElement) return;
        
        inputElement.addEventListener('input', (e) => {
            currentColors[colorKey] = e.target.value;
            updateColorValue(inputElement.id, e.target.value);
            updateTotem();
            updatePresets(inputElement.id, e.target.value);
        });
    }
    
    /**
     * Update preset button active state
     */
    function updatePresets(inputId, value) {
        const presetsContainer = document.querySelector(`.color-presets[data-target="${inputId}"]`);
        if (!presetsContainer) return;
        
        presetsContainer.querySelectorAll('.preset').forEach(preset => {
            if (preset.dataset.color.toLowerCase() === value.toLowerCase()) {
                preset.classList.add('active');
            } else {
                preset.classList.remove('active');
            }
        });
    }
    
    /**
     * Initialize color presets
     */
    function initPresets() {
        document.querySelectorAll('.color-presets').forEach(container => {
            const targetId = container.dataset.target;
            const targetInput = document.getElementById(targetId);
            
            container.querySelectorAll('.preset').forEach(preset => {
                preset.addEventListener('click', () => {
                    const color = preset.dataset.color;
                    
                    if (targetInput) {
                        targetInput.value = color;
                        targetInput.dispatchEvent(new Event('input'));
                    }
                });
            });
        });
    }
    
    /**
     * Reset all colors to default
     */
    function resetColors() {
        currentColors = { ...defaultColors };
        
        // Update inputs
        if (elements.bodyColor) {
            elements.bodyColor.value = defaultColors.body;
            updateColorValue('bodyColor', defaultColors.body);
        }
        if (elements.accentColor) {
            elements.accentColor.value = defaultColors.accent;
            updateColorValue('accentColor', defaultColors.accent);
        }
        if (elements.ledColor) {
            elements.ledColor.value = defaultColors.led;
            updateColorValue('ledColor', defaultColors.led);
        }
        if (elements.emblemColor) {
            elements.emblemColor.value = defaultColors.emblem;
            updateColorValue('emblemColor', defaultColors.emblem);
        }
        
        // Update presets
        updatePresets('bodyColor', defaultColors.body);
        updatePresets('accentColor', defaultColors.accent);
        updatePresets('ledColor', defaultColors.led);
        updatePresets('emblemColor', defaultColors.emblem);
        
        // Update totem
        updateTotem();
        
        // Reset rotation
        currentRotation = 0;
        updateRotation();
    }
    
    /**
     * Handle rotation
     */
    function updateRotation() {
        if (elements.totem3d) {
            elements.totem3d.style.transform = `rotateY(${currentRotation}deg)`;
        }
    }
    
    /**
     * Rotate left
     */
    function rotateLeft() {
        currentRotation -= 15;
        updateRotation();
    }
    
    /**
     * Rotate right
     */
    function rotateRight() {
        currentRotation += 15;
        updateRotation();
    }
    
    /**
     * Reset view
     */
    function resetView() {
        currentRotation = 0;
        updateRotation();
    }
    
    /**
     * Start project - open modal with customization
     */
    function startProject() {
        if (typeof window.openProjectModal === 'function') {
            window.openProjectModal(currentColors);
        }
    }
    
    /**
     * Adjust color brightness
     */
    function adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    }
    
    // Initialize color inputs
    handleColorChange('body', elements.bodyColor);
    handleColorChange('accent', elements.accentColor);
    handleColorChange('led', elements.ledColor);
    handleColorChange('emblem', elements.emblemColor);
    
    // Initialize presets
    initPresets();
    
    // Reset button
    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', resetColors);
    }
    
    // Start project button
    if (elements.startProjectBtn) {
        elements.startProjectBtn.addEventListener('click', startProject);
    }
    
    // Rotation buttons
    if (elements.rotateLeftBtn) {
        elements.rotateLeftBtn.addEventListener('click', rotateLeft);
    }
    if (elements.rotateRightBtn) {
        elements.rotateRightBtn.addEventListener('click', rotateRight);
    }
    if (elements.resetViewBtn) {
        elements.resetViewBtn.addEventListener('click', resetView);
    }
    
    // Touch/Swipe support for totem rotation
    initTouchRotation();
    
    /**
     * Initialize touch rotation for mobile
     */
    function initTouchRotation() {
        const previewWrapper = document.querySelector('.preview-wrapper');
        if (!previewWrapper) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;
        
        // Touch events
        previewWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });
        
        previewWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            // Update rotation based on drag distance
            if (Math.abs(diff) > 10) {
                currentRotation += diff * 0.3;
                updateRotation();
                touchStartX = currentX;
            }
        }, { passive: true });
        
        previewWrapper.addEventListener('touchend', (e) => {
            isDragging = false;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Handle swipe gesture
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    rotateRight();
                } else {
                    rotateLeft();
                }
            }
        }
        
        // Mouse drag support for desktop
        let mouseStartX = 0;
        let isMouseDragging = false;
        
        previewWrapper.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            previewWrapper.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            
            const diff = e.clientX - mouseStartX;
            if (Math.abs(diff) > 5) {
                currentRotation += diff * 0.3;
                updateRotation();
                mouseStartX = e.clientX;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isMouseDragging = false;
            previewWrapper.style.cursor = 'grab';
        });
        
        // Set initial cursor
        previewWrapper.style.cursor = 'grab';
        
        // Add instruction hint for mobile
        if ('ontouchstart' in window) {
            const hint = document.createElement('div');
            hint.className = 'touch-hint';
            hint.innerHTML = '<i class="fas fa-hand-pointer"></i> Arraste para girar';
            hint.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 8px 16px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 20px;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.7);
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.5s ease;
                z-index: 10;
            `;
            previewWrapper.style.position = 'relative';
            previewWrapper.appendChild(hint);
            
            // Hide hint after first interaction
            previewWrapper.addEventListener('touchstart', () => {
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 500);
            }, { once: true });
        }
    }
    
    // Initial setup
    updateTotem();
    updatePresets('bodyColor', defaultColors.body);
    updatePresets('accentColor', defaultColors.accent);
    updatePresets('ledColor', defaultColors.led);
    updatePresets('emblemColor', defaultColors.emblem);
}
