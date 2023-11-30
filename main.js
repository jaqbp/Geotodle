import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,1);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.autoRotate = true;
controls.autoRotateSpeed = -0.2;
controls.enablePan = false;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
let cameraAnimating = true;

function showText() {
    const textDiv = document.createElement('div');
    textDiv.classList.add('animated-text'); 
    textDiv.style.position = 'absolute';
    textDiv.style.top = '40px';
    textDiv.style.width = '100%';
    textDiv.style.textAlign = 'center';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '50px';
    textDiv.style.fontFamily = 'Outfit, sans-serif';
    textDiv.innerHTML = 'Halemba';
    document.body.appendChild(textDiv);
}

const gltfLoader = new GLTFLoader();
gltfLoader.load('halemba_model.gltf', (gltf) => {
    const root = gltf.scene;
    root.position.set(0, 0, 0);
    scene.add(root);
    cameraAnimating = true;
});


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 2); 
scene.add(ambientLight);

const sphereGeometry = new THREE.SphereGeometry(0.01, 16, 16); 
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

const cloudPoints = 1000; 
for (let i = 0; i < cloudPoints; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(30));
    sphere.position.set(x, y, z);

  
    scene.add(sphere);
}



function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (cameraAnimating) {
        camera.position.z += 0.03;
        camera.position.x += 0.03;
        camera.position.y += 0.03;
        if (camera.position.z > 12) {
            cameraAnimating = false; 
            showText();
        }
    }

    renderer.render(scene, camera);
}


animate();
window.addEventListener('resize', onWindowResize, false);