// Initialize scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create phone frame geometry
const phoneGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.02);
const screenGeometry = new THREE.PlaneGeometry(0.55, 1.1);

// Create phone frame material
const phoneMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide });

// Create phone frame mesh
const phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial);
const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);

// Position phone frame and screen
phoneMesh.position.set(0, 0, 0);
screenMesh.position.set(0, 0, 0.015);

// Add phone frame and screen to the scene
scene.add(phoneMesh);
scene.add(screenMesh);

// Set camera position
camera.position.z = 2;

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate phone frame
    phoneMesh.rotation.x += 0.005;
    phoneMesh.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();
