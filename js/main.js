/**
 * SP Security - Landing Page
 * Main JavaScript File
 * Optimized for iOS and Android
 */

document.addEventListener('DOMContentLoaded', () => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // Add device classes to body
    document.body.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
    if (isIOS) document.body.classList.add('is-ios');
    if (isAndroid) document.body.classList.add('is-android');
    
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initParticles(isMobile);
    initScrollAnimations();
    initModal();
    initTouchSupport();
    initViewportFix();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Particles background effect
 * Reduced for mobile performance
 */
function initParticles(isMobile) {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? 20 : 50;
    
    // Skip particles if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
    
    // Add particle styles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            animation: particleFloat linear infinite;
            pointer-events: none;
            will-change: transform, opacity;
        }
        
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .project-card, .spec-category, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Modal functionality
 */
function initModal() {
    const modal = document.getElementById('chatModal');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal?.querySelector('.modal-overlay');
    
    if (!modal) return;
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open modal with customization data
 * @param {Object} colors - Color configuration
 */
function openProjectModal(colors) {
    const modal = document.getElementById('chatModal');
    const summary = document.getElementById('modalSummary');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (!modal) return;
    
    // Build summary HTML
    if (summary && colors) {
        summary.innerHTML = `
            <div class="summary-color">
                <div class="color-box" style="background: ${colors.body}"></div>
                <span>Corpo</span>
            </div>
            <div class="summary-color">
                <div class="color-box" style="background: ${colors.accent}"></div>
                <span>Destaque</span>
            </div>
            <div class="summary-color">
                <div class="color-box" style="background: ${colors.led}"></div>
                <span>LED</span>
            </div>
            <div class="summary-color">
                <div class="color-box" style="background: ${colors.emblem}"></div>
                <span>Emblema</span>
            </div>
        `;
    }
    
    // Update WhatsApp link with visual summary page
    if (whatsappLink && colors) {
        // Generate the visual summary page URL
        const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
        const summaryUrl = `${baseUrl}resumo-projeto.html?body=${encodeURIComponent(colors.body)}&accent=${encodeURIComponent(colors.accent)}&led=${encodeURIComponent(colors.led)}&emblem=${encodeURIComponent(colors.emblem)}`;
        
        const message = encodeURIComponent(
            `Olá! Acabei de personalizar um totem no site e gostaria de dar início ao projeto.\n\n` +
            `🎨 Veja minha personalização completa:\n` +
            `${summaryUrl}\n\n` +
            `Aguardo contato para discutirmos os próximos passos!`
        );
        whatsappLink.href = `https://wa.me/5511969218791?text=${message}`;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Export for use in customizer.js
window.openProjectModal = openProjectModal;

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Touch support for mobile devices
 */
function initTouchSupport() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .benefit-card, .project-card, .preset');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        el.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Prevent double-tap zoom on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.click();
        });
    });
    
    // Add touch styles
    const style = document.createElement('style');
    style.textContent = `
        .touch-active {
            opacity: 0.8;
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Fix iOS 100vh issue
 */
function initViewportFix() {
    // Set CSS variable for real viewport height
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    // Add CSS using the variable
    const style = document.createElement('style');
    style.textContent = `
        .hero {
            min-height: calc(var(--vh, 1vh) * 100);
        }
        
        .mobile-menu {
            height: calc(var(--vh, 1vh) * 100);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Lazy load images for better mobile performance
 */
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Detect connection speed and adjust accordingly
 */
function checkConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('save-data');
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                .save-data * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Run connection check
checkConnection();
