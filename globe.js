/* Three.js Globe Script */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('globe-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const texture = new THREE.TextureLoader().load('https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg');
    const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 50 });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    camera.position.z = 10;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.001; // Auto-rotate
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Add markers
    function latLongToVector3(lat, lon, radius) {
        const phi = Math.PI / 2 - lat * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;
        return new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    function addMarker(lat, lon, color) {
        const markerGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const markerMat = new THREE.MeshBasicMaterial({ color: color });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        const pos = latLongToVector3(lat, lon, 5.05); // Slightly above surface
        marker.position.copy(pos);
        scene.add(marker);
    }

    // Sample markers
    addMarker(-3, -60, 0xff0000); // Fires: Amazon - red
    addMarker(30, 31, 0x0000ff); // Floods: Nile, Egypt - blue
    addMarker(80, 0, 0x00ff00); // Climate change: Arctic - green

    // Resize handler
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
