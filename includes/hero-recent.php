<section class="hero">
    <canvas id="bg"></canvas>
    <div class="overlay"></div>

    <div class="content">
        <h1>Your Safety.<br><span>Our</span> Guarantee.</h1>

        <p>
            AI-powered CCTV Monitoring with <span class="highlight">&lt;60s Police Response</span>
        </p>

        <div class="hero-buttons">
            <a href="contact-page.php" class="btn btn-primary">Get Started</a>
            <a href="contact-page.php" class="btn btn-secondary">Book Demo</a>
        </div>

        <div class="hero-stats">
            <div class="stat-card">
                <div class="stat-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="10" width="3.5" height="11" rx="1"></rect>
                        <rect x="10.25" y="6" width="3.5" height="15" rx="1"></rect>
                        <rect x="17.5" y="3" width="3.5" height="18" rx="1"></rect>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-number">99%</div>
                    <div class="stat-label">Uptime SLA</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-number">&lt;60s</div>
                    <div class="stat-label">Fast Response</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="6" width="12" height="12" rx="2"></rect>
                        <path d="M15 10l6-3v10l-6-3z"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-number">10k+</div>
                    <div class="stat-label">Cameras Protected</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="5" y="10" width="14" height="10" rx="2"></rect>
                        <path d="M8 10V7a4 4 0 018 0v3"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">AI Monitoring</div>
                </div>
            </div>
        </div>

        <div class="scroll-indicator">
            <p>Scroll to explore</p>
            <div class="scroll-dot"></div>
        </div>
    </div>
</section>

<style>
    .hero {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .hero canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .hero .overlay {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at center, rgba(0, 234, 255, .08), transparent 40%),
            linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, .92));
        z-index: 2;
    }

    .hero-stats {
        position: relative !important;
        z-index: 10 !important;
        display: grid !important;
        grid-template-columns: repeat(2, minmax(150px, 1fr)) !important;
        gap: 14px !important;
        width: min(100%, 560px) !important;
        margin: 10px auto 42px !important;
        animation: fadeInRight 1s ease 0.3s both !important;
    }

    .stat-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 18px;
        background: rgba(0, 234, 255, 0.05);
        border: 1px solid rgba(0, 234, 255, 0.15);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        animation: slideInRight 0.6s ease 0.4s both;
        position: relative;
        overflow: hidden;
    }

    .stat-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(0, 234, 255, 0.1), rgba(0, 234, 255, 0));
        opacity: 0;
        transition: opacity 0.35s ease;
    }

    .stat-card:hover {
        background: rgba(0, 234, 255, 0.08);
        border-color: rgba(0, 234, 255, 0.3);
        box-shadow: 0 8px 32px rgba(0, 234, 255, 0.15), inset 0 0 32px rgba(0, 234, 255, 0.05);
        transform: translateX(-8px);
    }

    .stat-card:hover::before {
        opacity: 1;
    }

    .stat-icon {
        width: 40px;
        height: 40px;
        min-width: 40px;
        color: #00eaff;
        display: grid;
        place-items: center;
        opacity: 0.95;
        flex-shrink: 0;
    }

    .stat-icon svg {
        width: 26px;
        height: 26px;
    }

    .stat-content {
        position: relative;
        z-index: 1;
    }

    .stat-number {
        font-size: 22px;
        font-weight: 700;
        color: #00eaff;
        text-shadow: 0 0 12px rgba(0, 234, 255, 0.4);
        line-height: 1;
        margin-bottom: 4px;
        letter-spacing: -0.5px;
    }

    .stat-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.65);
        font-weight: 600;
        letter-spacing: 0.3px;
        text-transform: uppercase;
    }

    .content {
        position: relative;
        z-index: 5;
        width: min(100%, 850px);
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: fadeUp 1.2s ease;
    }

    .content h1 {
        font-size: 76px;
        line-height: 1.1;
        letter-spacing: -1px;
        font-weight: 700;
        text-shadow: 0 0 30px rgba(255, 255, 255, .08);
        margin-bottom: 20px;
    }

    .content h1 span {
        color: #00eaff;
        text-shadow: 0 0 20px rgba(0, 234, 255, .6);
    }

    .content p {
        font-size: 18px;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.85);
        max-width: 720px;
        margin: 0 auto 40px;
        font-weight: 500;
    }

    .content p .highlight {
        color: #00eaff;
        font-weight: 700;
    }

    .hero-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .btn {
        display: inline-block;
        padding: 14px 40px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        cursor: pointer;
    }

    .btn-primary {
        background: #00eaff;
        color: #000;
        box-shadow: 0 0 20px rgba(0, 234, 255, .35);
    }

    .btn-primary:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 40px rgba(0, 234, 255, .6);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: #00eaff;
        box-shadow: 0 0 20px rgba(0, 234, 255, .2);
        transform: translateY(-4px);
    }

    .scroll-indicator {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        animation: bounceInUp 1s ease 0.8s both;
    }

    .scroll-indicator p {
        font-size: 13px;
        color: rgba(0, 234, 255, 0.7);
        letter-spacing: 1px;
        font-weight: 600;
        margin: 0;
        text-transform: uppercase;
    }

    .scroll-dot {
        width: 24px;
        height: 40px;
        border: 2px solid rgba(0, 234, 255, 0.4);
        border-radius: 12px;
        position: relative;
        animation: scrollPulse 2s infinite;
    }

    .scroll-dot::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 8px;
        background: #00eaff;
        border-radius: 2px;
        animation: scrollMove 2s infinite;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(40px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes scrollMove {
        0%, 100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: translateX(-50%) translateY(12px);
        }
    }

    @keyframes scrollPulse {
        0%, 100% {
            border-color: rgba(0, 234, 255, 0.4);
        }
        50% {
            border-color: rgba(0, 234, 255, 0.8);
        }
    }

    @keyframes bounceInUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @media(max-width: 1024px) {
        .stat-number {
            font-size: 22px;
        }

        .content h1 {
            font-size: 56px;
        }
    }

    @media(max-width: 768px) {
        .hero-stats {
            grid-template-columns: 1fr;
            width: 100%;
            max-width: 360px;
            margin: 14px auto 34px;
            animation: fadeUp 1s ease;
        }

        .stat-card {
            width: 100%;
            justify-content: flex-start;
            padding: 14px 16px;
            gap: 12px;
        }

        .stat-card:hover {
            transform: translateY(-4px);
        }

        .stat-icon {
            width: 36px;
            height: 36px;
        }

        .stat-icon svg {
            width: 22px;
            height: 22px;
        }

        .stat-number {
            font-size: 18px;
        }

        .stat-label {
            font-size: 11px;
        }

        .content h1 {
            font-size: 42px;
        }

        .content p {
            font-size: 16px;
        }

        .hero-buttons {
            flex-direction: column;
            gap: 12px;
        }

        .btn {
            width: 100%;
        }
    }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<script>
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    /* camera pulled back for full coverage */
    camera.position.z = 38;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg"),
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    /* MUCH BIGGER plane */
    const geometry = new THREE.PlaneGeometry(160, 160, 260, 260);

    const material = new THREE.PointsMaterial({
        color: 0x00eaff,
        size: 0.06,
        transparent: true,
        opacity: 0.95
    });

    const wave = new THREE.Points(geometry, material);

    /* better angle + lower position */
    wave.rotation.x = -1.02;
    wave.rotation.z = -0.12;
    wave.position.y = -12;

    scene.add(wave);

    function animate(t) {

        requestAnimationFrame(animate);

        const pos = geometry.attributes.position;

        for (let i = 0; i < pos.count; i++) {

            let x = pos.getX(i);
            let y = pos.getY(i);

            /* full width cinematic wave */
            let z =
                Math.sin((x + y) * 0.12 + t * 0.0012) * 2.8 +
                Math.cos((x * 0.18 + y * 0.14) + t * 0.0015) * 2.0 +
                Math.sin((x - y) * 0.08 + t * 0.0009) * 1.4;

            pos.setZ(i, z);
        }

        pos.needsUpdate = true;

        /* slow premium motion */
        wave.rotation.z += 0.00012;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
</script>