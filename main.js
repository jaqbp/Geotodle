import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {createInput} from './functions.js'
import {showText} from './functions.js'
import { initializeModelsInGame } from './functions.js';
import {clearTexts} from './functions.js';
import {clearInputs} from './functions.js';
import { clearButtons } from './functions.js';
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
    clearButtons();
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
    createNextButton();
    let ModelsInGame = initializeModelsInGame("path");
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scenes.game.add(ambientLight);
    let input;
    let currentIndex = 0;
    let isGuessed = false; 
    let score = 0;
    const gltfLoader = new GLTFLoader();

    function loadModel(index) {
        if (index < ModelsInGame.length) {
            gltfLoader.load(ModelsInGame[index].getPath(), (gltf) => {
                const root = gltf.scene;
                root.position.set(0, 0, 0);
                scenes.game.add(ambientLight);
                scenes.game.add(root);
                cameraAnimating = true;
                clearInputs(); 
                clearTexts();
                createInput();
                showText("Jakie to miasto?");
                input = document.querySelector('.animated-input');
                if (index !== (ModelsInGame.length - 1)) {
                    clearButtons();
                    isGuessed = false;
                    createNextButton();
                } else {     
                    const nextButton = document.querySelector('.animated-button');
                    nextButton.innerHTML = 'Zakończ';
                    nextButton.style.zIndex = 1000;
                    nextButton.addEventListener('click', () => {
                        clearTexts();
                        clearInputs();
                        clearButtons();
                        showSummary();
                    });
                }
                
            });
        }
    }

    function showSummary() {
        clearTexts();
        clearInputs();
        clearButtons();
        let summary = document.createElement('div');
        summary.classList.add('animated-text');
        summary.style.position = 'absolute';
        summary.style.top = '40px';
        summary.style.width = '100%';
        summary.style.textAlign = 'center';
        summary.style.color = 'white';
        summary.style.fontSize = '100px';
        summary.style.fontFamily = 'Outfit, sans-serif';
        summary.innerHTML = 'Koniec gry!';
        summary.innerHTML += '<br>';
        summary.innerHTML += 'Twój wynik to: ' + score + '/' + ModelsInGame.length;
        document.body.appendChild(summary);
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Wróć do menu';
        nextButton.style.position = 'absolute';
        nextButton.style.bottom = '20px';
        nextButton.style.left = '50%';
        nextButton.style.transform = 'translateX(-50%)';
        nextButton.style.zIndex = 1000;
        nextButton.style.width = '300px';
        nextButton.style.height = '50px';
        nextButton.style.border = '2px solid black';
        nextButton.style.borderRadius = '10px';
        nextButton.style.padding = '10px';
        nextButton.style.fontSize = '20px';
        nextButton.style.fontFamily = 'Outfit, sans-serif';
        nextButton.style.textAlign = 'center';
        nextButton.style.color = 'black';
        nextButton.style.backgroundColor = 'white';
        nextButton.classList.add('animated-button');
        nextButton.style.zIndex = 1000;
        nextButton.addEventListener('click', () => {
            clearTexts();
            clearInputs();
            clearButtons();
            switchScene('main');
        });
        document.body.appendChild(nextButton);
    }

    function createNextButton() {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Sprawdź';
        nextButton.style.position = 'absolute';
        nextButton.style.bottom = '40px';
        nextButton.style.right = '10%';
        nextButton.style.width = '200px';
        nextButton.style.border = '2px solid black';
        nextButton.style.borderRadius = '10px';
        nextButton.style.padding = '20px';
        nextButton.style.fontSize = '20px';
        nextButton.style.fontFamily = 'Outfit, sans-serif';
        nextButton.style.textAlign = 'center';
        nextButton.style.color = 'black';
        nextButton.style.backgroundColor = 'white';
        nextButton.classList.add('animated-button');
        nextButton.style.zIndex = 1000;
        nextButton.addEventListener('click', () => {
            input = document.querySelector('.animated-input');
            if (isGuessed) {
                console.log(input.value);
                if (currentIndex === (ModelsInGame.length - 1)) {
                    showSummary();  
                    return;
                }
                scenes.game.children = [];
                currentIndex++;
                console.log(ModelsInGame[currentIndex].getName());
                clearTexts();
                loadModel(currentIndex);
            }
            else {
                if (input.value.toLowerCase() === ModelsInGame[currentIndex].getName().toLowerCase()) {
                    clearTexts();
                    showText("Dobrze!");
                    score++;
                    if (currentIndex !== (ModelsInGame.length - 1)) {
                        nextButton.innerText = 'Następne';
                    } else {
                        nextButton.innerText = 'Zakończ';
                    }
                    isGuessed = true;
                } 
                else {
                    clearTexts();
                    showText("Źle!");
                    if (currentIndex !== (ModelsInGame.length - 1)) {
                        nextButton.innerText = 'Następne';
                    } else {
                        nextButton.innerText = 'Zakończ';
                    }
                    isGuessed = true;
                }
            }
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
    button.innerHTML = 'Zmień scenę';
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
