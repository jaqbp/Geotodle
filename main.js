import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createInput } from "./functions.js";
import { showText } from "./functions.js";
import { initializeModelsInGame } from "./functions.js";
import { clearTexts } from "./functions.js";
import { clearInputs } from "./functions.js";
import { clearButtons } from "./functions.js";
import "./styles.css";

let currentScene = "main";
const scenes = {
  main: new THREE.Scene(),
  game: new THREE.Scene(),
};

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document
  .getElementsByClassName("canvas-wrapper")[0]
  .appendChild(renderer.domElement);

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

const nextButton = document.querySelector("#nextButton");
const ambientLight = new THREE.AmbientLight(0xffffff, 2);

function loadGameScene() {
  scenes.game.children = [];
  clearTexts();
  createNextButton();
  const gameModels = initializeModelsInGame("path").slice(0, 2);
  scenes.game.add(ambientLight);
  let input;
  let currentIndex = 0;
  let isGuessed = false;
  let score = 0;
  loadModel(currentIndex);

  function loadModel(index) {
    if (index >= gameModels.length) {
      return;
    }
    const gltfLoader = new GLTFLoader();
    renderer.clear();
    gltfLoader.load(gameModels[index].getPath(), (gltf) => {
      const root = gltf.scene;
      root.position.set(0, 0, 0);
      // scenes.game.add(ambientLight);
      scenes.game.add(root);
      cameraAnimating = true;
      clearInputs();
      clearTexts();
      createInput();
      showText("Jakie to miasto?");
      input = document.querySelector(".user-input");
      if (index !== gameModels.length - 1) {
        clearButtons();
        isGuessed = false;
        createNextButton();
      } else {
        nextButton.innerHTML = "Zakończ";
        nextButton.addEventListener("click", () => {
          clearTexts();
          clearInputs();
          clearButtons();
          showSummary();
        });
      }
    });
  }

  function showSummary() {
    clearTexts();
    clearInputs();
    clearButtons();
    let summary = document.createElement("p");
    summary.classList.add(
      "animation-fade-in",
      "text",
      "text--large",
      "text--center",
      "summary",
    );
    summary.innerHTML = `Koniec gry!<br />Twój wynik to: ${score}/${gameModels.length}`;
    document.body.appendChild(summary);
    goToMenuBtn.classList.remove("hidden");
  }

  function createNextButton() {
    nextButton.addEventListener("click", () => {
      input = document.querySelector(".user-input");
      if (isGuessed) {
        console.log(input.value);
        if (currentIndex === gameModels.length - 1) {
          showSummary();
          return;
        }
        scenes.game.children = [];
        currentIndex++;
        console.log(gameModels[currentIndex].getName());
        clearTexts();
        // loadModel(currentIndex);
      } else {
        if (
          input.value.toLowerCase() ===
          gameModels[currentIndex].getName().toLowerCase()
        ) {
          clearTexts();
          showText("Dobrze!");
          score++;
          if (currentIndex !== gameModels.length - 1) {
            nextButton.innerText = "Następne";
          } else {
            nextButton.innerText = "Zakończ";
          }
          isGuessed = true;
          currentIndex++;
          // loadModel(currentIndex);
        } else {
          clearTexts();
          showText("Źle!");
          if (currentIndex !== gameModels.length - 1) {
            nextButton.innerText = "Następne";
          } else {
            nextButton.innerText = "Zakończ";
          }
          isGuessed = true;
          currentIndex++;
          // loadModel(currentIndex);
        }
      }
    });
  }
}

/**
 * @param {"game" | "main"} sceneName
 * @returns {void}
 */
function switchScene(sceneName) {
  currentScene = sceneName;
  camera.position.set(0, 0, 1); // Resetuj pozycję kamery
  controls.reset(); // Resetuj kontrolery

  if (sceneName === "game") {
    loadGameScene();
  } else {
    // initMainScene();
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (currentScene === "game" && cameraAnimating) {
    camera.position.z += 0.03;
    camera.position.x += 0.03;
    camera.position.y += 0.03;
    if (camera.position.z > 12) {
      cameraAnimating = false;
    }
  }

  renderer.render(scenes[currentScene], camera);
}

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false,
);

function main() {
  animate(); // animuje scene co klatke
}

const menu = document.querySelector("#menu");
const playBtn = document.querySelector("#play");
const showDaneBtn = document.querySelector("#dane");
const goToMenuBtn = document.querySelector("#goToMenuBtn");
const plot = document.querySelector("#plot");
const canvas = document.getElementsByTagName("canvas")[0];
canvas.classList.add("hidden");

playBtn.addEventListener("click", () => {
  switchScene("game");
  menu.classList.add("hidden");

  showDaneBtn.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  canvas.classList.remove("hidden");
});

showDaneBtn.addEventListener("click", () => {
  if (plot.classList.contains("hidden")) {
    plot.classList.remove("hidden");
  } else {
    plot.classList.add("hidden");
  }
});

goToMenuBtn.addEventListener("click", () => {
  clearTexts();
  clearInputs();
  clearButtons();
  switchScene("main");
  goToMenuBtn.classList.add("hidden");
});

main();
