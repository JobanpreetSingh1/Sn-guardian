/* ============================================
   GUARDIANGRID - Enhanced JavaScript with Premium Animations
   ============================================ */

// ============ PREMIUM CONSTANTS & CONFIG ============
const PREMIUM_CONFIG = {
    animationDuration: 0.6,
    staggerDelay: 0.1,
    scrollThreshold: 0.1,
    parallaxStrength: 0.5,
    mouseGlowSize: 40,
    heroCanvasFPS: 60,
};

// ============ PAGE INITIALIZATION ============
// All initialization is handled in script.js to avoid duplicate event listeners
// This file contains only function definitions for premium features

// ============ PREMIUM LOADER ANIMATION ============
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        loader.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 1800);
}

// ============ PREMIUM NAVBAR ============
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
    }, { passive: true });
}

// ============ MOBILE MENU TOGGLE ============
// Note: initMobileMenu() is defined in script.js to avoid duplication

// ============ PREMIUM CURSOR GLOW EFFECT ============
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (!cursorGlow) return;
    
    let isMoving = false;
    let hideTimer;
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = (e.clientX - PREMIUM_CONFIG.mouseGlowSize / 2) + 'px';
        cursorGlow.style.top = (e.clientY - PREMIUM_CONFIG.mouseGlowSize / 2) + 'px';
        
        if (!isMoving) {
            cursorGlow.style.opacity = '1';
            isMoving = true;
        }
        
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            isMoving = false;
            cursorGlow.style.opacity = '0';
        }, 1000);
    });
    
    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// ============ SMOOTH SCROLL NAVIGATION ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============ ADVANCED SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: PREMIUM_CONFIG.scrollThreshold,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger animation
                const delay = index * PREMIUM_CONFIG.staggerDelay;
                entry.target.style.animationDelay = delay + 's';
                entry.target.classList.add('animate-in');
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll(
        '.glass-card, .problem-card, .solution-card, .service-card, .pricing-card, ' +
        '.timeline-item, .info-card, .stat-card, .team-card, .value-card, ' +
        '.achievement-card, .blog-card, .quick-contact-card, .office-card'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.observe(element);
    });
}

// ============ PREMIUM COUNTERS ============
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000;
                    animatePremiumCounter(entry.target, target, duration);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function animatePremiumCounter(element, target, duration) {
    let currentValue = 0;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - easeOutQuad
        const eased = progress * (2 - progress);
        currentValue = Math.floor(target * eased);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    update();
}

// ============ FORM VALIDATION ============
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form || form.dataset.contactForm === 'custom') return;
    
    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        form.querySelectorAll('input, textarea, select').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

function validateField(field) {
    let isValid = true;
    const errorMessage = field.nextElementSibling;
    
    field.classList.remove('error');
    if (errorMessage && errorMessage.classList.contains('form-error')) {
        errorMessage.textContent = '';
    }
    
    if (field.name === 'name') {
        if (field.value.trim().length < 2) {
            isValid = false;
            if (errorMessage) errorMessage.textContent = 'Name must be at least 2 characters';
        }
    }
    
    if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            if (errorMessage) errorMessage.textContent = 'Please enter a valid email';
        }
    }
    
    if (field.name === 'phone') {
        const cleaned = field.value.replace(/\D/g, '');
        if (cleaned.length !== 10) {
            isValid = false;
            if (errorMessage) errorMessage.textContent = 'Phone must be 10 digits';
        }
    }
    
    if (field.name === 'message') {
        if (field.value.trim().length < 10) {
            isValid = false;
            if (errorMessage) errorMessage.textContent = 'Message must be at least 10 characters';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
    
    return isValid;
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const formMessage = document.getElementById('formMessage');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.textContent = 'Sending message...';
    
    const formData = Object.fromEntries(new FormData(form).entries());

    fetch('https://script.google.com/macros/s/AKfycbyA20jC3q7EwEG9kTW8KIT_66FPOVb4y1oumRWxExZrCNO9utXV1hVe-0RbcA2DKMdgJg/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.textContent = 'Message sent successfully! We\'ll contact you soon.';
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.textContent = 'Error sending message. Please try again later.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}

// ============ BLOG CATEGORY FILTERING ============
function initBlogFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (categoryButtons.length === 0 || blogCards.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============ NEWSLETTER SUBSCRIPTION ============
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        const btn = newsletterForm.querySelector('button');
        
        if (email && email.value) {
            const originalText = btn.textContent;
            btn.textContent = 'Subscribing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Subscribed! ✓';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    email.value = '';
                }, 2000);
            }, 1000);
        }
    });
}

// ============ PARALLAX EFFECTS ============
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const strength = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const offset = scrollY * strength;
            element.style.transform = `translateY(${offset}px)`;
        });
    }, { passive: true });
}

// ============ PREMIUM HOVER EFFECTS ============
function initHoverEffects() {
    // Interactive button effects
    document.querySelectorAll('.btn, .glass-card, .nav-link').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Service card text reveal on hover
    document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
        const content = card.querySelector('p');
        if (content) {
            card.addEventListener('mouseenter', function() {
                content.style.opacity = '1';
            });
            card.addEventListener('mouseleave', function() {
                content.style.opacity = '0.8';
            });
        }
    });
}

// ============ PREMIUM TEXT ANIMATIONS ============
function initPremiumAnimations() {
    // Staggered letter animations for main headings
    document.querySelectorAll('h1, h2').forEach(heading => {
        if (heading.classList.contains('animated-text')) {
            const text = heading.textContent;
            heading.innerHTML = '';
            
            let delay = 0;
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.animationDelay = (delay * 0.05) + 's';
                span.className = 'letter-animate';
                heading.appendChild(span);
                if (text[i] !== ' ') delay++;
            }
        }
    });
}

// ============ ADVANCED KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
    // ESC to close menus
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        if (menuToggle && navLinks) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
    
    // Tab navigation focus indicator
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============ ACCESSIBILITY - REDUCED MOTION ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}

// ============ PERFORMANCE OPTIMIZATION ============
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%cGuardianGrid loaded successfully! 🔐', 'color: #00F0FF; font-size: 14px; font-weight: bold;');
