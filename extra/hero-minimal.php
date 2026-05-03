<?php
// If this file is requested directly, output a minimal HTML wrapper so it works standalone.
$__hero_standalone = (realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME']));
if ($__hero_standalone) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
    echo '<title>Hero - GuardianGrid Premium</title>';
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
    echo '</head><body>';
}
?>

<section id="home" class="hero hero-premium">
    <style>
:root {
    --bg-0: #05111f;
    --bg-1: #07192c;
    --bg-2: #0c2742;
    --panel: rgba(5, 19, 35, 0.66);
    --panel-strong: rgba(8, 26, 49, 0.82);
    --border: rgba(89, 225, 255, 0.18);
    --border-strong: rgba(89, 225, 255, 0.36);
    --cyan: #4fe7ff;
    --cyan-strong: #00ccff;
    --cyan-soft: rgba(79, 231, 255, 0.14);
    --text: #edf9ff;
    --muted: rgba(229, 247, 255, 0.72);
    --muted-soft: rgba(229, 247, 255, 0.54);
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior:smooth; }

body {
    background:
        radial-gradient(circle at 20% 20%, rgba(79,231,255,0.14), transparent 28%),
        radial-gradient(circle at 80% 15%, rgba(25,157,255,0.10), transparent 26%),
        linear-gradient(180deg, var(--bg-0) 0%, var(--bg-1) 48%, #040c16 100%);
    color:var(--text);
    font-family:var(--font-sans);
    line-height:1.6;
    overflow-x:hidden;
}

.hero-premium {
    position:relative;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    isolation:isolate;
    padding:clamp(1.25rem, 2vw, 2rem);
}

.hero-premium::before,
.hero-premium::after {
    content:'';
    position:absolute;
    inset:0;
    pointer-events:none;
}

.hero-premium::before {
    background:
        linear-gradient(rgba(79,231,255,0.09) 1px, transparent 1px),
        linear-gradient(90deg, rgba(79,231,255,0.09) 1px, transparent 1px);
    background-size:72px 72px;
    opacity:0.18;
    transform:perspective(1000px) rotateX(62deg) translateY(11%);
    transform-origin:center bottom;
    filter:blur(0.1px);
    animation:grid-drift 18s linear infinite;
}

.hero-premium::after {
    background:
        radial-gradient(circle at 50% 42%, rgba(79,231,255,0.12), transparent 26%),
        radial-gradient(circle at 50% 50%, rgba(0,204,255,0.07), transparent 44%),
        linear-gradient(180deg, rgba(2, 8, 15, 0.10), rgba(2, 8, 15, 0.62));
    z-index:0;
}

.hero-shell {
    position:relative;
    z-index:1;
    width:min(1200px, 100%);
    display:grid;
    grid-template-columns:repeat(12, minmax(0, 1fr));
    gap:clamp(1rem, 2vw, 1.5rem);
    align-items:center;
}

.hero-copy,
.hero-visual,
.hero-trust {
    backdrop-filter:blur(18px);
    -webkit-backdrop-filter:blur(18px);
    border:1px solid var(--border);
    background:linear-gradient(180deg, rgba(9, 27, 47, 0.72), rgba(5, 19, 35, 0.52));
    box-shadow:0 32px 80px rgba(1, 10, 20, 0.42);
}

.hero-copy {
    grid-column:1 / span 7;
    padding:clamp(1.35rem, 2vw, 2.5rem);
    border-radius:28px;
    position:relative;
    overflow:hidden;
}

.hero-copy::before {
    content:'';
    position:absolute;
    inset:auto auto -30% -12%;
    width:280px;
    height:280px;
    background:radial-gradient(circle, rgba(79,231,255,0.16), transparent 68%);
    pointer-events:none;
}

.eyebrow {
    display:inline-flex;
    align-items:center;
    gap:0.65rem;
    font-size:0.8rem;
    font-weight:700;
    letter-spacing:0.22em;
    text-transform:uppercase;
    color:var(--cyan);
    margin-bottom:1.1rem;
}

.eyebrow::before {
    content:'';
    width:44px;
    height:1px;
    background:linear-gradient(90deg, transparent, var(--cyan), transparent);
}

.hero-copy h1 {
    font-size:clamp(2.7rem, 6vw, 5.6rem);
    line-height:0.95;
    letter-spacing:-0.055em;
    font-weight:900;
    max-width:10ch;
    text-wrap:balance;
}

.hero-copy h1 .accent {
    display:block;
    color:var(--cyan);
    text-shadow:0 0 24px rgba(79,231,255,0.26);
}

.hero-copy p {
    margin-top:1.1rem;
    max-width:38rem;
    color:var(--muted);
    font-size:clamp(1rem, 1.4vw, 1.15rem);
}

.hero-actions {
    display:flex;
    flex-wrap:wrap;
    gap:0.85rem;
    margin-top:1.75rem;
}

.hero-button {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:0.55rem;
    min-width:170px;
    padding:0.95rem 1.35rem;
    border-radius:999px;
    text-decoration:none;
    font-weight:800;
    letter-spacing:0.01em;
    transition:transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease, background 240ms ease, color 240ms ease;
}

.hero-button.primary {
    color:#05111f;
    background:linear-gradient(135deg, #9af3ff 0%, #49dcff 44%, #00aef5 100%);
    box-shadow:0 14px 34px rgba(0, 180, 255, 0.30);
}

.hero-button.secondary {
    color:var(--text);
    background:rgba(79,231,255,0.05);
    border:1px solid var(--border-strong);
}

.hero-button:hover {
    transform:translateY(-2px);
}

.hero-button.primary:hover {
    box-shadow:0 18px 40px rgba(0, 180, 255, 0.38);
}

.hero-button.secondary:hover {
    background:rgba(79,231,255,0.1);
    border-color:rgba(79,231,255,0.52);
}

.hero-meta {
    margin-top:1.5rem;
    display:flex;
    flex-wrap:wrap;
    gap:0.85rem 1.25rem;
    color:var(--muted-soft);
    font-size:0.9rem;
}

.hero-meta span {
    display:inline-flex;
    align-items:center;
    gap:0.5rem;
}

.hero-meta span::before {
    content:'';
    width:8px;
    height:8px;
    border-radius:999px;
    background:var(--cyan);
    box-shadow:0 0 0 4px rgba(79,231,255,0.12);
}

.hero-visual {
    grid-column:8 / span 5;
    min-height:540px;
    border-radius:30px;
    position:relative;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
}

.hero-visual .orbital {
    position:absolute;
    inset:11% 10%;
    border-radius:50%;
    border:1px solid rgba(79,231,255,0.18);
    box-shadow:inset 0 0 40px rgba(79,231,255,0.05);
    animation:orbitPulse 7s ease-in-out infinite;
}

.hero-visual .orbital::before,
.hero-visual .orbital::after {
    content:'';
    position:absolute;
    inset:0;
    border-radius:inherit;
    border:1px dashed rgba(79,231,255,0.12);
    transform:scale(0.78);
}

.hero-visual .orbital::after {
    transform:scale(0.56);
}

.globe-wrap {
    position:relative;
    width:min(420px, 82vw);
    aspect-ratio:1;
    display:grid;
    place-items:center;
}

.globe-halo {
    position:absolute;
    width:92%;
    height:92%;
    border-radius:50%;
    background:radial-gradient(circle, rgba(79,231,255,0.16), rgba(79,231,255,0.02) 45%, transparent 68%);
    filter:blur(6px);
    animation:haloBreath 5.4s ease-in-out infinite;
}

.globe-canvas {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
}

.globe-overlay {
    position:absolute;
    inset:auto 10% 9% 10%;
    text-align:center;
    color:var(--muted);
    font-size:0.78rem;
    letter-spacing:0.3em;
    text-transform:uppercase;
    z-index:2;
    pointer-events:none;
}

.hero-trust {
    grid-column:1 / span 12;
    border-radius:24px;
    margin-top:clamp(0.85rem, 1.5vw, 1.1rem);
    padding:1rem;
    display:grid;
    grid-template-columns:repeat(4, minmax(0, 1fr));
    gap:0.85rem;
}

.trust-item {
    padding:1rem 1rem 0.95rem;
    border-radius:18px;
    background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    border:1px solid rgba(79,231,255,0.12);
    position:relative;
    overflow:hidden;
}

.trust-item::before {
    content:'';
    position:absolute;
    inset:auto -20% -50% auto;
    width:120px;
    height:120px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(79,231,255,0.14), transparent 66%);
}

.trust-item h3 {
    font-size:clamp(1.6rem, 3vw, 2.4rem);
    line-height:1;
    color:var(--text);
    font-weight:900;
    letter-spacing:-0.05em;
}

.trust-item h3 .suffix {
    font-size:0.9rem;
    color:var(--cyan);
    margin-left:0.1rem;
}

.trust-item p {
    margin-top:0.45rem;
    color:var(--muted-soft);
    font-size:0.88rem;
}

.microcopy {
    margin-top:0.9rem;
    color:rgba(229,247,255,0.62);
    font-size:0.86rem;
}

.hero-grid {
    position:absolute;
    inset:0;
    background:
        radial-gradient(circle at center, rgba(0, 204, 255, 0.08), transparent 28%),
        linear-gradient(transparent 0 92%, rgba(79,231,255,0.18) 92% 93%, transparent 93%),
        linear-gradient(90deg, transparent 0 92%, rgba(79,231,255,0.18) 92% 93%, transparent 93%);
    background-size:100% 100%, 100% 24px, 24px 100%;
    mix-blend-mode:screen;
    opacity:0.75;
    animation:gridShift 11s linear infinite;
}

.hero-noise {
    position:absolute;
    inset:0;
    background-image:linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size:100% 3px;
    opacity:0.07;
    pointer-events:none;
}

@keyframes grid-drift {
    from { background-position:0 0, 0 0; }
    to { background-position:0 72px, 72px 0; }
}

@keyframes gridShift {
    from { transform:translate3d(0,0,0); }
    to { transform:translate3d(24px, 24px, 0); }
}

@keyframes orbitPulse {
    0%, 100% { transform:scale(0.99); opacity:0.85; }
    50% { transform:scale(1.02); opacity:1; }
}

@keyframes haloBreath {
    0%, 100% { transform:scale(0.98); opacity:0.75; }
    50% { transform:scale(1.03); opacity:1; }
}

@media (max-width: 1120px) {
    .hero-shell {
        grid-template-columns:repeat(12, minmax(0, 1fr));
    }

    .hero-copy {
        grid-column:1 / span 12;
    }

    .hero-visual {
        grid-column:1 / span 12;
        min-height:420px;
    }

    .hero-trust {
        grid-template-columns:repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 720px) {
    .hero-premium {
        padding:0.9rem;
    }

    .hero-copy,
    .hero-visual,
    .hero-trust {
        border-radius:22px;
    }

    .hero-copy h1 {
        max-width:100%;
    }

    .hero-actions {
        flex-direction:column;
    }

    .hero-button {
        width:100%;
    }

    .hero-visual {
        min-height:340px;
    }

    .hero-trust {
        grid-template-columns:1fr;
    }
}
    </style>

    <div class="hero-grid"></div>
    <div class="hero-noise"></div>

    <div class="hero-shell">
        <div class="hero-copy">
            <div class="eyebrow">GuardianGrid Security Platform</div>
            <h1>
                Your Safety.
                <span class="accent">Our Guarantee.</span>
            </h1>
            <p>
                Premium AI-powered CCTV monitoring built for enterprise protection, real-time alerting, and rapid response when every second matters.
            </p>

            <div class="hero-actions">
                <a href="contact-page.php" class="hero-button primary">Request a Security Demo</a>
                <a href="contact-page.php" class="hero-button secondary">Talk to an Expert</a>
            </div>

            <div class="hero-meta">
                <span>24/7 monitoring</span>
                <span>Instant threat detection</span>
                <span>Corporate-grade reporting</span>
            </div>
            <div class="microcopy">Trusted by security teams that need a refined, future-ready monitoring experience.</div>
        </div>

        <div class="hero-visual" aria-label="Rotating globe wireframe visualization">
            <div class="orbital"></div>
            <div class="globe-wrap">
                <div class="globe-halo"></div>
                <canvas class="globe-canvas" id="heroGlobe"></canvas>
                <div class="globe-overlay">Global command visibility</div>
            </div>
        </div>

        <div class="hero-trust">
            <div class="trust-item">
                <h3 data-target="99">0<span class="suffix">%</span></h3>
                <p>Uptime Reliability</p>
            </div>
            <div class="trust-item">
                <h3 data-target="45">0<span class="suffix">s</span></h3>
                <p>Average Response Window</p>
            </div>
            <div class="trust-item">
                <h3 data-target="24">0<span class="suffix">/7</span></h3>
                <p>AI Monitoring Coverage</p>
            </div>
            <div class="trust-item">
                <h3 data-target="10000">0<span class="suffix">+</span></h3>
                <p>Cameras Monitored</p>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
    (function() {
        function animateCounters(root) {
            root.querySelectorAll('.trust-item h3').forEach(function(el) {
                var target = parseInt(el.dataset.target, 10) || 0;
                var duration = 1400;
                var start = performance.now();
                var valueNode = el.firstChild;

                function step(time) {
                    var progress = Math.min(1, (time - start) / duration);
                    if (valueNode) {
                        valueNode.nodeValue = Math.floor(progress * target).toLocaleString();
                    }
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        if (valueNode) {
                            valueNode.nodeValue = target.toLocaleString();
                        }
                    }
                }

                requestAnimationFrame(step);
            });
        }

        function buildGlobe() {
            var canvas = document.getElementById('heroGlobe');
            if (!canvas || typeof THREE === 'undefined') {
                return;
            }

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            var group = new THREE.Group();

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(560, 560, false);

            camera.position.z = 4.8;

            var globeGeometry = new THREE.IcosahedronGeometry(1.75, 2);
            var globeMaterial = new THREE.MeshBasicMaterial({
                color: 0x5ff0ff,
                wireframe: true,
                transparent: true,
                opacity: 0.92
            });
            var globe = new THREE.Mesh(globeGeometry, globeMaterial);

            var ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x1aa6ff,
                wireframe: true,
                transparent: true,
                opacity: 0.26
            });
            var ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.015, 10, 180), ringMaterial);
            var ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.015, 10, 180), ringMaterial.clone());
            ring2.rotation.x = Math.PI * 0.5;

            var glow = new THREE.Mesh(
                new THREE.SphereGeometry(1.85, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x0c4d6c, transparent: true, opacity: 0.08 })
            );

            group.add(globe);
            group.add(ring1);
            group.add(ring2);
            group.add(glow);
            scene.add(group);

            var lights = [
                new THREE.PointLight(0x5ff0ff, 1.15, 12),
                new THREE.PointLight(0x00b7ff, 0.65, 12)
            ];
            lights[0].position.set(3.2, 2.4, 4);
            lights[1].position.set(-3.4, -1.8, 3);
            scene.add(lights[0]);
            scene.add(lights[1]);

            function resize() {
                var container = canvas.parentNode;
                var rect = container.getBoundingClientRect();
                var dimension = Math.max(320, Math.min(rect.width, rect.height));
                renderer.setSize(dimension, dimension, false);
                camera.aspect = 1;
                camera.updateProjectionMatrix();
            }

            function animate() {
                group.rotation.y += 0.006;
                group.rotation.x = Math.sin(performance.now() * 0.0005) * 0.08;
                ring1.rotation.z += 0.002;
                ring2.rotation.z -= 0.0016;
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }

            resize();
            window.addEventListener('resize', resize, { passive: true });
            animate();
        }

        function initHero() {
            animateCounters(document);
            buildGlobe();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHero, { once: true });
        } else {
            initHero();
        }
    })();
    </script>
</section>

<?php
if ($__hero_standalone) {
    echo "\n</body></html>";
}
?>
