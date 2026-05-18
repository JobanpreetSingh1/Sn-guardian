/* ============================================
   GUARDIANGRID - JavaScript
   ============================================ */

// ============ CONSTANTS & CONFIG ============
const CONFIG = {
    animationDuration: 0.6,
    staggerDelay: 0.1,
    scrollThreshold: 0.1,
};

// ============ PAGE INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initMobileMenu();
    initCursorGlow();
    initHeroCanvas();
    initSmoothScroll();
    initScrollAnimations();
    initCounters();
});

// ============ LOADER ANIMATION ============
function initLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        loader.style.transition = 'all 0.8s ease-in-out';
    }, 1800);
}

// ============ NAVBAR FUNCTIONALITY ============
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============ MOBILE MENU TOGGLE ============
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Update aria-expanded for accessibility
        menuToggle.setAttribute('aria-expanded', isActive);
    });
    
    // Close menu when link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============ CURSOR GLOW EFFECT ============
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX - 20 + 'px';
        cursorGlow.style.top = e.clientY - 20 + 'px';
    });
}

// ============ THREE.JS 3D HERO ANIMATION ============
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    // Prevent double initialization when multiple hero scripts are present
    if (canvas.dataset.heroInitialized === 'true') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 50;
    // mark initialized so enhanced script won't re-init the same canvas
    try { canvas.dataset.heroInitialized = 'true'; } catch (e) {}
    
    // Create particles
    const particleCount = 100;
    const particles = [];
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 150;
        particlePositions[i + 1] = (Math.random() - 0.5) * 150;
        particlePositions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
    );
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00E5FF,
        size: 0.5,
        opacity: 0.8,
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Create central rotating cube with glow
    const geometry = new THREE.IcosahedronGeometry(15, 4);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3B82F6,
        emissive: 0x00E5FF,
        wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Create sphere around cube
    const sphereGeometry = new THREE.SphereGeometry(30, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00E5FF,
        wireframe: true,
        opacity: 0.1,
        transparent: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Add lighting
    const light1 = new THREE.PointLight(0x00E5FF, 1);
    light1.position.set(50, 50, 50);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x3B82F6, 0.8);
    light2.position.set(-50, -50, 50);
    scene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        cube.rotation.x += 0.0005;
        cube.rotation.y += 0.001;
        sphere.rotation.x -= 0.0003;
        sphere.rotation.y -= 0.0005;
        particleSystem.rotation.x += 0.0001;
        particleSystem.rotation.y += 0.0002;
        
        cube.position.x = mouseX * 10;
        cube.position.y = mouseY * 10;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============ SMOOTH SCROLL NAVIGATION ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
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

// ============ SCROLL ANIMATIONS (INTERSECTION OBSERVER) ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.scrollThreshold,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for multiple elements
                if (entry.target.classList.contains('glass-card') || 
                    entry.target.classList.contains('problem-card') ||
                    entry.target.classList.contains('solution-card') ||
                    entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('pricing-card') ||
                    entry.target.classList.contains('timeline-item')) {
                    
                    const delay = index * CONFIG.staggerDelay;
                    entry.target.style.transitionDelay = delay + 's';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll(
        '.glass-card, .problem-card, .solution-card, .service-card, .pricing-card, .timeline-item, .info-card'
    ).forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ============ ANIMATED COUNTERS ============
function initCounters() {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-target]').forEach(element => {
        observer.observe(element);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(target * easeOutQuad(progress));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// ============ COUNTER ANIMATION FOR STATS ============
document.querySelectorAll('.counter').forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(end * progress);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============ PARALLAX EFFECT (OPTIONAL) ============
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        // reduce parallax intensity to avoid large layout shifts
        heroCanvas.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    // Press Escape to close mobile menu
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============ BLOG CATEGORY FILTERING ============
function initBlogFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (categoryButtons.length === 0 || blogCards.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter blog cards
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
                btn.textContent = 'Subscribed!';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    email.value = '';
                }, 2000);
            }, 1000);
        }
    });
}

// ============ ACCESSIBILITY: FOCUS VISIBLE ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus-visible styles dynamically
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #00E5FF;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// ============ INITIALIZE BLOG FEATURES ============
document.addEventListener('DOMContentLoaded', () => {
    initBlogFiltering();
    initNewsletterForm();
});

// Persistent external toggle handler (safer than inline handlers when CSP blocks inline scripts)
document.addEventListener('click', function(e){
    const mt = document.getElementById('menuToggle');
    if(!mt) return;
    // If the toggle or any child of it was clicked
    if(mt.contains(e.target) || e.target === mt){
        const nav = document.getElementById('navLinks');
        const active = mt.classList.toggle('active');
        if(nav) nav.classList.toggle('active');
        // Explicitly set inline maxHeight so computed style matches content
        if(nav) {
            if(active) {
                nav.style.maxHeight = nav.scrollHeight + 'px';
            } else {
                nav.style.maxHeight = '0px';
            }
        }
        mt.setAttribute('aria-expanded', active);
        console.log('External script toggle. aria-expanded=', active, 'nav.scrollHeight=', nav ? nav.scrollHeight : null);
    }
}, { passive: true });
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
/* ============================================
   GUARDIANGRID - Enhanced 3D Hero Script
   ============================================ */

// Three.js Enhanced Hero Animation
function initEnhancedHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;
    // Prevent re-initializing if another hero initializer already ran
    if (canvas.dataset.heroInitialized === 'true') return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;
    // mark initialized so base script won't re-init the same canvas
    try { canvas.dataset.heroInitialized = 'true'; } catch (e) {}
    
    // ============ ENHANCED PARTICLE SYSTEM ============
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 200;
        particlePositions[i + 1] = (Math.random() - 0.5) * 200;
        particlePositions[i + 2] = (Math.random() - 0.5) * 150;
        
        particleVelocities[i] = (Math.random() - 0.5) * 0.1;
        particleVelocities[i + 1] = (Math.random() - 0.5) * 0.1;
        particleVelocities[i + 2] = (Math.random() - 0.5) * 0.1;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00F0FF,
        size: 0.8,
        opacity: 0.6,
        sizeAttenuation: true,
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // ============ PRIMARY GEOMETRY (Enhanced Icosahedron) ============
    const geometry = new THREE.IcosahedronGeometry(20, 5);
    const material = new THREE.MeshPhongMaterial({
        color: 0x0EA5E9,
        emissive: 0x00F0FF,
        wireframe: false,
        shininess: 100,
    });
    const primaryGeometry = new THREE.Mesh(geometry, material);
    scene.add(primaryGeometry);
    
    // ============ SECONDARY WIREFRAME GEOMETRY ============
    const wireframeGeometry = new THREE.IcosahedronGeometry(25, 4);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        wireframe: true,
        opacity: 0.2,
        transparent: true,
    });
    const wireframeObject = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeObject);
    
    // ============ TORUS RINGS ============
    const torusGeometry = new THREE.TorusGeometry(35, 2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B5CF6,
        emissive: 0x8B5CF6,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: false,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);
    
    // ============ SPHERICAL HALO ============
    const haloGeometry = new THREE.SphereGeometry(40, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        wireframe: true,
        opacity: 0.15,
        transparent: true,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);
    
    // ============ ADVANCED LIGHTING ============
    // Key light
    const keyLight = new THREE.PointLight(0x00F0FF, 1.5);
    keyLight.position.set(50, 50, 50);
    scene.add(keyLight);
    
    // Fill light
    const fillLight = new THREE.PointLight(0x0EA5E9, 0.8);
    fillLight.position.set(-50, -50, 50);
    scene.add(fillLight);
    
    // Back light
    const backLight = new THREE.PointLight(0x8B5CF6, 1);
    backLight.position.set(0, 0, -50);
    scene.add(backLight);
    
    // Ambient light (subtle)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // ============ MOUSE INTERACTION ============
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // ============ ANIMATION LOOP ============
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.001;
        
        // Smooth mouse following
        targetX = mouseX * 0.3;
        targetY = mouseY * 0.3;
        
        // Primary geometry rotation with mouse influence
        primaryGeometry.rotation.x += 0.0003 + targetY * 0.01;
        primaryGeometry.rotation.y += 0.0006 + targetX * 0.01;
        primaryGeometry.rotation.z += 0.0001;
        
        // Wireframe counter-rotation
        wireframeObject.rotation.x -= 0.0002;
        wireframeObject.rotation.y -= 0.0004;
        
        // Torus rotation
        torus.rotation.x += 0.0001;
        torus.rotation.z += 0.0002;
        
        // Halo gentle rotation
        halo.rotation.y += 0.0001;
        
        // Update particles
        const positions = particleGeometry.attributes.position.array;
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] += particleVelocities[i];
            positions[i + 1] += particleVelocities[i + 1];
            positions[i + 2] += particleVelocities[i + 2];
            
            // Bounce particles at boundaries
            if (Math.abs(positions[i]) > 100) particleVelocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 100) particleVelocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 75) particleVelocities[i + 2] *= -1;
        }
        particleGeometry.attributes.position.needsUpdate = true;
        
        // Pulse effect on primary geometry
        const scale = 1 + Math.sin(time * 2) * 0.05;
        primaryGeometry.scale.set(scale, scale, scale);
        
        // Lighting animation
        keyLight.intensity = 1.5 + Math.sin(time * 1.5) * 0.3;
        fillLight.intensity = 0.8 + Math.cos(time * 1.2) * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // ============ WINDOW RESIZE ============
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initEnhancedHeroCanvas);
