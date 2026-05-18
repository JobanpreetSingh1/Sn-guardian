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
    initFormValidation();
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

// ============ FORM VALIDATION ============
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form || form.dataset.contactForm === 'custom') return;
    
    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(field => {
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
    
    // Clear previous error
    field.classList.remove('error');
    if (errorMessage) errorMessage.textContent = '';
    
    // Validation rules
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
        const phoneRegex = /^\d{10}$/;
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
    
    // Disable button and show loading state
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

// ============ PARALLAX EFFECT (OPTIONAL) ============
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        heroCanvas.style.transform = `translateY(${scrollY * 0.5}px)`;
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
