/* ============================================
   GUARDIANGRID - Enhanced 3D Hero Script
   ============================================ */

// Three.js Enhanced Hero Animation
function initEnhancedHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 50;
    
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
