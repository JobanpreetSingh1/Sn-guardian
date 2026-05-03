<style>
    /* Hero section extracted for reuse */

    /* ============ HERO SECTION ============ */
    #heroCanvas {
        width: 100%;
        height: 100%;
        display: block;
    }

    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        padding: 100px 20px 50px;
        margin-top: 0;
    }

    .hero-3d-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .hero-text {
        animation: slideInUp 0.8s ease-out 0.3s both;
    }

    .hero-title {
        font-size: clamp(2rem, 8vw, 4rem);
        line-height: 1.2;
        margin-bottom: 20px;
        font-weight: 800;
    }

    .hero-subtitle {
        font-size: clamp(1rem, 4vw, 1.5rem);
        color: var(--gray-med);
        margin-bottom: 40px;
        line-height: 1.6;
    }

    .highlight {
        color: var(--neon-cyan);
        font-weight: 700;
    }

    .hero-buttons {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .hero-stats {
        display: flex;
        justify-content: space-around;
        gap: 20px;
        margin-top: 80px;
        flex-wrap: wrap;
    }

    .stat {
        text-align: center;
        animation: scaleIn 0.6s ease-out 0.6s both;
    }

    .stat h3 {
        font-size: 2.5rem;
        color: var(--neon-cyan);
        margin-bottom: 5px;
        font-weight: 700;
    }

    .stat p {
        color: var(--gray-med);
        font-size: 0.9rem;
    }

    .scroll-indicator {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        z-index: 2;
        animation: float 3s ease-in-out infinite;
    }

    .scroll-indicator span {
        font-size: 0.9rem;
        color: var(--gray-med);
    }

    .mouse {
        width: 24px;
        height: 40px;
        border: 2px solid var(--neon-cyan);
        border-radius: 12px;
        position: relative;
    }

    .mouse::after {
        content: '';
        position: absolute;
        width: 3px;
        height: 8px;
        background: var(--neon-cyan);
        border-radius: 2px;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        animation: mouseScroll 1.5s ease-in-out infinite;
    }

    @keyframes mouseScroll {

        0%,
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        50% {
            opacity: 0;
            transform: translateX(-50%) translateY(12px);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes float {

        0%,
        100% {
            transform: translateX(-50%) translateY(0);
        }

        50% {
            transform: translateX(-50%) translateY(-10px);
        }
    }

    @media (max-width: 768px) {
        .hero {
            padding: 80px 16px 40px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .hero-title {
            font-size: 2.15rem;
            line-height: 1.12;
            overflow-wrap: anywhere;
        }

        .hero-subtitle {
            font-size: 0.98rem;
            line-height: 1.5;
            overflow-wrap: anywhere;
        }

        .hero-buttons {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
        }

        .hero-buttons .btn {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        .hero-content {
            padding-inline: 0.25rem;
        }

        .hero {
            padding: 72px 14px 32px;
            gap: 1rem;
        }

        .hero-title {
            font-size: 1.85rem;
            line-height: 1.1;
            letter-spacing: -0.5px;
        }

        .hero-subtitle {
            font-size: 0.92rem;
            line-height: 1.45;
            margin-bottom: 1.25rem;
        }

        .hero-stats {
            flex-direction: column;
            gap: 15px;
            margin-top: 1rem;
        }
    }

    @media (min-width: 992px) {
        .hero-stats {
            position: absolute;
            right: 60px;
            top: 50%;
            transform: translateY(-50%);
            width: auto;
            display: flex;
            gap: 20px;
        }

        .hero {
            padding-right: 220px;
        }

        .hero-content {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -10%);
            max-width: 900px;
            text-align: center;
            z-index: 10;
        }
    }

    @media (max-width: 991px) {
        .hero {
            padding-right: 16px;
        }

        .hero-content {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            width: 100%;
            max-width: 100%;
        }

        .hero-stats {
            position: static;
            transform: none;
            right: auto;
            top: auto;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    @media (max-width: 360px) {
        .hero-title {
            font-size: 1.6rem;
            line-height: 1.15;
            overflow-wrap: anywhere;
        }

        .hero-subtitle {
            font-size: 0.88rem;
            line-height: 1.45;
        }
    }
</style>
<section class="hero" id="home">
    <div class="hero-3d-container">
        <canvas id="heroCanvas"></canvas>
    </div>

    <div class="hero-content">
        <div class="hero-text">
            <h1 class="hero-title">
                Your Safety.
                <span class="gradient-text">Our Guarantee.</span>
            </h1>
            <p class="hero-subtitle">
                AI-powered CCTV Monitoring with <span class="highlight">&lt;60s Police Response</span>
            </p>
            <div class="hero-buttons">
                <a href="contact-page.php" class="btn btn-primary">Get Started</a>
                <a href="contact-page.php" class="btn btn-secondary">Book Demo</a>
            </div>
        </div>
    </div>

    <div class="hero-stats">
        <div class="stat">
            <h3 data-target="99">0</h3>
            <p>Uptime %</p>
        </div>
        <div class="stat">
            <h3 data-target="60">0</h3>
            <p>Response Time (sec)</p>
        </div>
        <div class="stat">
            <h3 data-target="10000">0</h3>
            <p>Cameras Monitored</p>
        </div>
    </div>

    <div class="scroll-indicator">
        <span>Scroll to explore</span>
        <div class="mouse"></div>
    </div>
</section>
<script>
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
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true
        });

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
</script>