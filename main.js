import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {createInput} from './functions.js'
import {showText} from './functions.js'
import { initializeModelsInGame } from './functions.js';
import { createNextButton } from './functions.js';
import {clearTexts} from './functions.js';
import {clearInputs} from './functions.js';
let currentScene = 'main';
const scenes = {
    main: new THREE.Scene(),
    game: new THREE.Scene()
};

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.autoRotate = true;
controls.autoRotateSpeed = -0.2;
controls.enablePan = false;
let cameraAnimating = true;

function initMainScene() {
    clearInputs();
    clearTexts();
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scenes.main.add(ambientLight);
    const textDiv = document.createElement('div');
    textDiv.classList.add('animated-text');
    textDiv.style.position = 'absolute';
    textDiv.style.top = '40px';
    textDiv.style.width = '100%';
    textDiv.style.textAlign = 'center';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '100px';
    textDiv.style.fontFamily = 'Outfit, sans-serif';
    textDiv.innerHTML = 'Geotodle';
    document.body.appendChild(textDiv);

}

function initGameScene() {
    scenes.game.children = [];
    clearTexts();
    let ModelsInGame = initializeModelsInGame("path");
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scenes.game.add(ambientLight);
    const gltfLoader = new GLTFLoader();
    let currentIndex = 0;

    function loadModel(index) {
        if (index < ModelsInGame.length) {
            gltfLoader.load(ModelsInGame[index].getPath(), (gltf) => {
                const root = gltf.scene;
                root.position.set(0, 0, 0);
                scenes.game.add(root);
                cameraAnimating = true;
                showText(ModelsInGame[index].getName());
                createInput(); 
                input = document.querySelector('.animated-input');
                createNextButton();
            });
        }
    }

    function createNextButton() {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Następne miasto';
        nextButton.addEventListener('click', () => {
            scenes.game.remove(scenes.game.children.find(child => child === gltf.scene));
            currentIndex++;
            loadModel(currentIndex);
        });
        document.body.appendChild(nextButton);
    }

    loadModel(currentIndex);
}


function switchScene(sceneName) {
    currentScene = sceneName;
    camera.position.set(0, 0, 1); // Resetuj pozycję kamery
    controls.reset(); // Resetuj kontrolery

    if (sceneName === 'game') {
        initGameScene();
    } else {
        initMainScene();
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (currentScene === 'game' && cameraAnimating) {
        camera.position.z += 0.03;
        camera.position.x += 0.03;
        camera.position.y += 0.03;
        if (camera.position.z > 12) {
            cameraAnimating = false; 
        }
    }

    renderer.render(scenes[currentScene], camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

function addSceneSwitchButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Przełącz scenę';
    button.style.position = 'absolute';
    button.style.top = '20px';
    button.style.left = '20px';
    button.style.zIndex = 1000;
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        if (currentScene === 'main') {
            switchScene('game');
        } else {
            switchScene('main');
        }
    });
}

initMainScene();
addSceneSwitchButton();
animate();
