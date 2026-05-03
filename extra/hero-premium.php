<section class="hero-premium" aria-label="Premium hero">
    <canvas id="heroPremiumBg" class="hp-canvas" aria-hidden="true"></canvas>
    <div class="hp-vignette" aria-hidden="true"></div>
    <div class="hp-container">
        <div class="hp-content" role="region" aria-labelledby="hp-heading">
            <h1 id="hp-heading">Secure What<br><span>Matters Most</span></h1>
            <p class="hp-sub">Enterprise-grade CCTV, intelligent alerts, and easy management — built for clarity and
                privacy.</p>
            <p class="hp-desc">Proactive monitoring, tailored deployments, and industry-leading support for
                mission-critical spaces.</p>
            <a href="/contact-page.php" class="hp-cta" role="button" aria-label="Get free quote">Get Free Quote</a>
        </div>
    </div>
</section>

<style>
/* Scoped premium hero styles - .hero-premium */
.hero-premium {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 520px;
    overflow: hidden;
    display: block;
    background: #000;
    color: #fff;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

.hero-premium * {
    box-sizing: border-box;
}

.hero-premium .hp-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 0;
}

.hero-premium .hp-vignette {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(60% 60% at 50% 40%, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0) 20%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 70%), radial-gradient(1200px 800px at 10% 90%, rgba(0, 0, 0, 0.18), transparent 30%);
    mix-blend-mode: multiply;
}

.hero-premium .hp-container {
    position: relative;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 48px 24px;
}

.hero-premium .hp-content {
    max-width: 980px;
    text-align: center;
    transform: translateY(10px);
    opacity: 0;
    animation: hpFadeUp 800ms cubic-bezier(.22, .9, .28, 1) 250ms forwards;
}

.hero-premium h1 {
    font-weight: 700;
    font-size: clamp(34px, 6vw, 72px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
    color: #ffffff;
}

.hero-premium h1 span {
    color: #fff7e0;
    background: linear-gradient(90deg, #fff7e0 0%, #ffd454 50%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.hero-premium .hp-sub {
    margin: 0 auto 8px;
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(16px, 1.8vw, 20px);
    font-weight: 500;
    opacity: 0.95;
}

.hero-premium .hp-desc {
    margin: 0 auto 26px;
    color: rgba(255, 255, 255, 0.72);
    font-size: clamp(13px, 1.4vw, 15px);
    max-width: 720px;
}

.hero-premium .hp-cta {
    display: inline-block;
    padding: 14px 26px;
    border-radius: 999px;
    background: linear-gradient(135deg, #ffd54a, #ffb800);
    color: #0b0b0b;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 8px 30px rgba(255, 181, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.45);
    transition: transform .18s cubic-bezier(.2, .9, .3, 1), box-shadow .18s;
    border: none;
}

.hero-premium .hp-cta:focus {
    outline: 3px solid rgba(255, 213, 74, 0.18);
    outline-offset: 4px;
}

.hero-premium .hp-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 60px rgba(255, 166, 0, 0.18), 0 4px 14px rgba(0, 0, 0, 0.5);
}

@keyframes hpFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Fine-tune for small screens */
@media (max-width: 640px) {
    .hero-premium {
        min-height: 520px;
    }

    .hero-premium .hp-content {
        padding: 12px;
    }

    .hero-premium h1 {
        font-size: clamp(28px, 9vw, 42px);
    }
}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function() {
    const canvas = document.getElementById('heroPremiumBg');
    if (!canvas) return;
    const hero = canvas.closest('.hero-premium');
    if (!hero) return;

    // Wait for THREE to exist (in case multiple includes load order differs)
    if (!window.THREE) {
        console.warn('Three.js not loaded for hero-premium');
        return;
    }

    // Performance thresholds
    const DPR_MAX = 2;
    let width = 0,
        height = 0,
        dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(dpr);
    renderer.autoClear = true;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1000);
    camera.position.set(0, 0, 42);

    // Layers: near (fine points), mid (main mesh), far (soft trail)
    const layers = [];

    function makeLayer(opts) {
        const {
            size = 90, segments = 120, color = 0xffffff, pointSize = 0.08, opacity = 0.7
        } = opts;
        const geo = new THREE.PlaneGeometry(size, size, segments, segments);
        const material = new THREE.PointsMaterial({
            color,
            size: pointSize,
            transparent: true,
            opacity,
            sizeAttenuation: true,
            depthWrite: false
        });
        const points = new THREE.Points(geo, material);
        points.userData = Object.assign({}, opts);
        // tilt for cinematic diagonal feel
        points.rotation.x = -Math.PI * 0.35; // ~-1.099 rad
        points.rotation.z = opts.rotationZ || -0.45;
        points.position.y = opts.y || -6;
        scene.add(points);
        return {
            points,
            geo,
            material
        };
    }

    layers.push(makeLayer({
        size: 120,
        segments: 180,
        color: 0xffffff,
        pointSize: 0.06,
        opacity: 0.9,
        rotationZ: -0.45,
        speed: 1.0
    })); // main
    layers.push(makeLayer({
        size: 120,
        segments: 120,
        color: 0xffffff,
        pointSize: 0.12,
        opacity: 0.22,
        rotationZ: -0.5,
        y: -8,
        speed: 0.6
    })); // near
    layers.push(makeLayer({
        size: 140,
        segments: 100,
        color: 0xffffff,
        pointSize: 0.045,
        opacity: 0.12,
        rotationZ: -0.42,
        y: -4,
        speed: 1.6
    })); // far soft

    // Add a subtle CSS-based glow layer via a blurred canvas fallback: handled by hp-vignette and CSS shadows

    // Setup resize handling
    function fitCanvas() {
        const rect = hero.getBoundingClientRect();
        width = Math.max(320, Math.floor(rect.width));
        height = Math.max(240, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Wave animation function
    function animateWave(t) {
        const time = t * 0.001; // ms -> s
        for (let li = 0; li < layers.length; li++) {
            const layer = layers[li];
            const geo = layer.geo;
            const pos = geo.attributes.position;
            const count = pos.count;
            const speed = (layer.points.userData.speed || 1) * 0.9;
            const amplitudeBase = 1.8 * (1 + li * 0.2);

            for (let i = 0; i < count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);

                // Diagonal flowing ribbons: combine sin/cos with (x+y) and (x-y)
                const d1 = Math.sin((x + y) * 0.22 + time * 0.7 * speed) * amplitudeBase;
                const d2 = Math.cos((x * 0.18 + y * 0.30) + time * 0.45 * speed) * (amplitudeBase * 0.85);
                const d3 = Math.sin((x - y) * 0.12 - time * 0.35 * speed) * (amplitudeBase * 0.6);

                const z = (d1 + d2 + d3) * (0.85 + li * 0.15);
                pos.setZ(i, z);
            }
            pos.needsUpdate = true;

            // subtle rotation over time for cinematic motion
            layer.points.rotation.y = Math.sin(time * 0.07 * (0.9 + li * 0.2)) * 0.03;
        }
    }

    // Render loop
    let rafId;

    function render(t) {
        rafId = requestAnimationFrame(render);
        animateWave(t);
        // slight camera drift for depth
        camera.position.x = Math.sin(t * 0.00012) * 0.6;
        camera.position.y = Math.cos(t * 0.00009) * 0.6;
        for (let li = 0; li < layers.length; li++) {
            // subtle parallax: shift layer positions based on index
            const layer = layers[li];
            layer.points.position.x = Math.sin(t * 0.0003 * (li + 1)) * (0.6 + li * 0.2);
        }
        renderer.render(scene, camera);
    }

    // Initialize
    fitCanvas();
    render(performance.now());

    // ResizeObserver for hero and its parent
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
            fitCanvas();
        });
        ro.observe(hero);
        ro.observe(document.body);
    } else {
        window.addEventListener('resize', fitCanvas);
    }

    // Pause rendering if tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
        } else {
            render(performance.now());
        }
    });

    // Tidy on unload if dynamic removal happens
    function dispose() {
        if (rafId) cancelAnimationFrame(rafId);
        layers.forEach(layer => {
            layer.geo.dispose();
            layer.material && layer.material.dispose();
            scene.remove(layer.points);
        });
        renderer.dispose();
    }
    // expose for debugging (optional)
    hero.__heroPremiumDispose = dispose;
})();
</script>