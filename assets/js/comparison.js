// Comparison Section interactions and animations
(function(){
    'use strict';

    function initComparisonSection(){
        const section = document.querySelector('.comparison-section');
        if(!section) return;

        const visual = section.querySelector('.comparison-visual');
        const detectionBox = section.querySelector('.detection-box');
        const cards = section.querySelectorAll('.cards-stack > *');
        const fadeUps = section.querySelectorAll('.fade-up');

        // Observer for visual pulse and fade-ups
        const obsOptions = { threshold: 0.12, rootMargin: '0px 0px -80px 0px' };

        const visualObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    visual.classList.add('visible');
                    // animate detection box
                    if(detectionBox) detectionBox.classList.add('active');
                    visualObserver.unobserve(entry.target);
                }
            });
        }, obsOptions);

        if(visual) {
            // prepare initial state
            visual.classList.add('fade-up');
            visualObserver.observe(visual);
        }

        // Stagger cards animation
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if(entry.isIntersecting){
                    // stagger based on order
                    setTimeout(() => entry.target.classList.add('visible'), i * 120);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, obsOptions);

        cards.forEach((c) => {
            c.classList.add('fade-up');
            cardObserver.observe(c);
        });

        // Small subtle floating effect for the visual on hover
        const split = section.querySelector('.comparison-split');
        if(split){
            split.addEventListener('mousemove', (e) => {
                const rect = split.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                split.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0)`;
            });
            split.addEventListener('mouseleave', () => split.style.transform = 'none');
        }

        // 3D tilt interactions for premium card
        const card3d = section.querySelector('.comparison-3d-card');
        if(card3d){
            const frame = card3d.querySelector('.comparison-frame');
            const cube = card3d.querySelector('.ai-cube .cube-inner');
            const particles = card3d.querySelectorAll('.comparison-particles span');
            let rafId = null;
            let mouseX = 0, mouseY = 0, rx = 0, ry = 0;

            function onPointer(e){
                const rect = card3d.getBoundingClientRect();
                const px = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width;
                const py = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) / rect.height;
                mouseX = (px - 0.5) * 2; // -1 .. 1
                mouseY = (py - 0.5) * 2;
                if(!rafId) rafId = requestAnimationFrame(updateTransform);
            }

            function updateTransform(){
                rafId = null;
                // Limit rotation
                const targetRy = mouseX * 8; // degrees
                const targetRx = -mouseY * 8;
                // simple smoothing
                ry += (targetRy - ry) * 0.12;
                rx += (targetRx - rx) * 0.12;
                if(frame) frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;

                // cube subtle follow
                if(cube) cube.style.transform = `rotateX(${rx * 0.6}deg) rotateY(${ry * 0.6}deg) translateZ(0)`;

                // particles parallax using CSS translate
                if(particles && particles.length){
                    particles.forEach((p, i) => {
                        const depth = (i - (particles.length/2)) * 6;
                        const tx = -mouseX * depth;
                        const ty = -mouseY * depth * 0.6;
                        p.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${1 - Math.abs(depth)/120})`;
                    });
                }
            }

            card3d.addEventListener('pointermove', onPointer, { passive: true });
            card3d.addEventListener('pointerdown', onPointer, { passive: true });
            card3d.addEventListener('pointerleave', () => {
                mouseX = 0; mouseY = 0;
                if(!rafId) rafId = requestAnimationFrame(updateTransform);
            });

            // continuous slow rotation for cube for life
            if(cube){
                let start = null;
                function rotateLoop(ts){
                    if(!start) start = ts;
                    const t = (ts - start) / 1000;
                    cube.style.transform += ` rotateZ(${t * 2}deg)`;
                    requestAnimationFrame(rotateLoop);
                }
                requestAnimationFrame(rotateLoop);
            }
        }

        // Accessibility: allow keyboard focus to trigger animations
        section.addEventListener('focusin', (e) => {
            if(detectionBox) detectionBox.classList.add('active');
        });
        section.addEventListener('focusout', (e) => {
            if(detectionBox) detectionBox.classList.remove('active');
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', initComparisonSection);
    } else {
        initComparisonSection();
    }
})();
