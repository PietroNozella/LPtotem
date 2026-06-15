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
    initHeroVideo();
    initParticles(isMobile);
    initScrollAnimations();
    initActiveNavigation();
    initAmbientMotion();
    initVideoShowcase();
    initMonitoringCenterCarousel();
    initModal();
    initTouchSupport();
    initViewportFix();
});

/**
 * Ensures the muted background video starts when autoplay is available.
 */
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
        const playRequest = video.play();
        playRequest?.catch(() => {
            // The poster remains visible if the browser blocks autoplay.
        });
    };

    if (video.readyState >= 2) {
        playVideo();
    } else {
        video.addEventListener('canplay', playVideo, { once: true });
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video.paused) playVideo();
    });
}

/**
 * Controls the monitoring center image carousel.
 */
function initMonitoringCenterCarousel() {
    const carousel = document.getElementById('monitoringCenterCarousel');
    const media = carousel?.closest('.monitoring-center-media');
    const slides = Array.from(carousel?.querySelectorAll('.monitoring-center-slide') || []);
    const dots = Array.from(media?.querySelectorAll('[data-carousel-dot]') || []);
    const previousButton = media?.querySelector('[data-carousel-previous]');
    const nextButton = media?.querySelector('[data-carousel-next]');
    const toggleButton = media?.querySelector('[data-carousel-toggle]');
    const currentLabel = media?.querySelector('[data-carousel-current]');

    if (!media || slides.length < 2 || !previousButton || !nextButton) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let currentIndex = 0;
    let autoplayId;
    let touchStartX = 0;
    let userPaused = reduceMotion;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentIndex;
            dot.classList.toggle('is-active', isActive);
            if (isActive) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        if (currentLabel) {
            currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
        }
    };

    const stopAutoplay = () => {
        window.clearInterval(autoplayId);
        autoplayId = undefined;
    };

    const startAutoplay = () => {
        const isInteracting = media.contains(document.activeElement) || (supportsHover && media.matches(':hover'));
        if (userPaused || autoplayId || isInteracting) return;
        autoplayId = window.setInterval(() => showSlide(currentIndex + 1), 5500);
    };

    const updateToggleButton = () => {
        if (!toggleButton) return;

        toggleButton.innerHTML = userPaused
            ? '<i class="fas fa-play" aria-hidden="true"></i>'
            : '<i class="fas fa-pause" aria-hidden="true"></i>';
        toggleButton.setAttribute(
            'aria-label',
            userPaused ? 'Reproduzir troca automática de imagens' : 'Pausar troca automática de imagens'
        );
    };

    previousButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    toggleButton?.addEventListener('click', () => {
        userPaused = !userPaused;
        stopAutoplay();
        updateToggleButton();
        startAutoplay();
    });

    media.addEventListener('mouseenter', stopAutoplay);
    media.addEventListener('mouseleave', startAutoplay);
    media.addEventListener('focusin', stopAutoplay);
    media.addEventListener('focusout', startAutoplay);

    media.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    media.addEventListener('touchend', (event) => {
        const touchDistance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(touchDistance) > 45) {
            showSlide(currentIndex + (touchDistance < 0 ? 1 : -1));
        }
        startAutoplay();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    showSlide(0);
    updateToggleButton();
    startAutoplay();
}

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
        const isOpen = mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu on link click
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Abrir menu');
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animatedElements = document.querySelectorAll(
        '.authority-intro, .authority-card, .authority-closing, .risks-header, .risk-card, .risks-transition, .integrated-solutions-header, .solution-group, .integrated-solutions-closing, .monitoring-center-header, .monitoring-center-showcase, .monitoring-center-card, .work-process-header, .work-process-step, .work-process-closing, .project-cases-header, .case-card, .project-cases-note, .tech-action-header, .tech-action-card, .tech-action-closing, .customizer-header, .totem-preview-area, .customization-panel, .cta-content, .map-section-header, .security-map-shell, .footer-grid'
    );

    if (reduceMotion || !('IntersectionObserver' in window)) {
        animatedElements.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    document.body.classList.add('motion-ready');

    const groups = new Map();
    animatedElements.forEach(el => {
        const group = el.parentElement;
        const groupIndex = groups.get(group) || 0;
        el.classList.add('reveal-item');
        el.style.setProperty('--reveal-delay', `${Math.min(groupIndex * 70, 280)}ms`);
        groups.set(group, groupIndex + 1);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Highlights the navigation item for the section currently in view.
 */
function initActiveNavigation() {
    if (!('IntersectionObserver' in window)) return;

    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
        const visibleEntry = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${visibleEntry.target.id}`;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }, {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0, 0.2, 0.6]
    });

    sections.forEach(section => observer.observe(section));
}

/**
 * Adds restrained depth using one requestAnimationFrame per scroll frame.
 */
function initAmbientMotion() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduceMotion || !supportsFinePointer) return;

    const targets = [
        document.querySelector('.hero'),
        document.querySelector('.security-map-canvas'),
        document.querySelector('.preview-stage')
    ].filter(Boolean);
    if (!targets.length) return;

    let ticking = false;
    const update = () => {
        targets.forEach(target => {
            const rect = target.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const normalized = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / window.innerHeight));
            target.style.setProperty('--ambient-shift', `${normalized * -10}px`);
        });
        ticking = false;
    };

    const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
}

/**
 * Keeps video playback intentional and limits concurrent media work.
 */
function initVideoShowcase() {
    const videos = document.querySelectorAll('.tech-action-video-wrap video');
    if (!videos.length) return;

    videos.forEach(video => {
        const card = video.closest('.tech-action-card');
        const playButton = card?.querySelector('.tech-video-play');

        playButton?.addEventListener('click', () => {
            const playRequest = video.play();
            playRequest?.catch(() => {
                // Native controls remain available when the browser blocks scripted playback.
            });
        });

        video.addEventListener('play', () => {
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });

            document.querySelectorAll('.tech-action-card.is-playing').forEach(activeCard => {
                activeCard.classList.remove('is-playing');
            });
            card?.classList.add('is-playing');
        });

        const clearPlayingState = () => card?.classList.remove('is-playing');
        video.addEventListener('pause', clearPlayingState);
        video.addEventListener('ended', clearPlayingState);
    });

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !entry.target.paused) {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.15
        });

        videos.forEach(video => videoObserver.observe(video));
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            videos.forEach(video => video.pause());
        }
    });
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
        whatsappLink.href = `https://wa.me/5511936215057?text=${message}`;
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
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        }
    });
});

/**
 * Touch support for mobile devices
 */
function initTouchSupport() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .benefit-card, .case-card, .preset');
    
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
