import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createInput } from "./functions.js";
import { showText } from "./functions.js";
import { initializeModelsInGame } from "./functions.js";
import { clearTexts } from "./functions.js";
import { clearInputs } from "./functions.js";
import { getLinkForModel } from "./functions.js";
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

const antiAliasing = false; // Jeżeli laguje mapa to ustaw na false
const renderer = new THREE.WebGLRenderer({
  antialias: antiAliasing,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const canvasWrapper = document.getElementsByClassName("canvas-wrapper")[0];
canvasWrapper.appendChild(renderer.domElement);

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

let currentIndex = 0;
let score = 0;

let gameModels = initializeModelsInGame("path");

function loadGameScene() {
  currentIndex = 0;
  score = 0;
  gameModels = initializeModelsInGame("path");
  canvasWrapper.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  showDaneBtn.classList.remove("hidden");
  scenes.game.children = [];
  clearTexts();
  scenes.game.add(ambientLight);
  loadModel(currentIndex);
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
    document.body.removeChild(document.getElementsByClassName("summary")[0]);
    nextButton.classList.add("hidden");
    showDaneBtn.classList.add("hidden");
    menu.classList.remove("hidden");
    canvasWrapper.classList.add("hidden");
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

function main() {
  animate(); // animuje scene co klatke
}

const menu = document.querySelector("#menu");
const playBtn = document.querySelector("#play");
const showDaneBtn = document.querySelector("#dane");
const goToMenuBtn = document.querySelector("#goToMenuBtn");
const plot_predykcja = document.querySelector("#plot_predykcja");
const plot_bezrobocie = document.querySelector("#plot_bezrobocie");
const canvas = document.getElementsByTagName("canvas")[0];
canvas.classList.add("hidden");

/** EVENT LISTENERS */

playBtn.addEventListener("click", () => {
  switchScene("game");
  menu.classList.add("hidden");

  showDaneBtn.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  canvas.classList.remove("hidden");
});

showDaneBtn.addEventListener("click", () => {
  if (plot_predykcja.classList.contains("hidden")) {
    plot_predykcja.classList.remove("hidden");
  } else {
    plot_predykcja.classList.add("hidden");
  }
  if (plot_bezrobocie.classList.contains("hidden")) {
    plot_bezrobocie.classList.remove("hidden");
  } else {
    plot_bezrobocie.classList.add("hidden");
  }
});

goToMenuBtn.addEventListener("click", () => {
  switchScene("main");
  goToMenuBtn.classList.add("hidden");
});

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false,
);

nextButton.addEventListener("click", () => {
  const input = document.querySelector(".user-input");
  camera.position.set(0, 0, 1);
  console.log(input.value);
  if (currentIndex === gameModels.length - 1) {
    if (
      input.value.toLowerCase().trim() ===
      gameModels[currentIndex].getName().toLowerCase()
    ) {
      score++;
    }
    showSummary();
    return;
  }
  scenes.game.children = [];
  console.log(gameModels[currentIndex].getName());
  clearTexts();
  // loadModel(currentIndex);
  console.log(input.value.toLowerCase());
  console.log(gameModels[currentIndex].getName().toLowerCase());
  if (
    input.value.toLowerCase().trim() ===
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
    currentIndex++;
    console.log(gameModels[currentIndex].getName());
    loadModel(currentIndex);
    // to było to miejsce
  } else {
    clearTexts();
    showText("Źle!");
    if (currentIndex !== gameModels.length - 1) {
      nextButton.innerText = "Następne";
    } else {
      nextButton.innerText = "Zakończ";
    }
    currentIndex++;
    console.log(gameModels[currentIndex].getName());
    loadModel(currentIndex);
  }
});

main();

function showSummary() {
  clearTexts();
  clearInputs();
  nextButton.classList.add("hidden");
  let summary = document.createElement("p");
  summary.classList.add(
    "animation-fade-in",
    "text",
    "text--large",
    "text--center",
    "summary",
  );
  summary.innerHTML = `Koniec gry!<br />Twój wynik to: ${score}/${gameModels.length} <br>`;

  summary.classList.remove("text--large");
  summary.classList.add("text--medium");
  if (score !== gameModels.length) {
    summary.innerHTML += `Miasta, które były w grze: <br>`;
    gameModels.forEach((model) => {
      summary.innerHTML += `${model.getName()}<br>`;
    });
    summary.innerHTML += 'Powodzenia następnym razem!'
  }
  else {
    summary.innerHTML += 'Brawo! Wszystkie miasta odgadnięte!'
  }
  document.body.appendChild(summary);
  goToMenuBtn.classList.remove("hidden");
}

const gltfLoader = new GLTFLoader();
function loadModel(index) {
  if (index >= gameModels.length) {
    return;
  }
  gltfLoader.load(gameModels[index].getPath(), (gltf) => {
    const root = gltf.scene;
    root.position.set(0, 0, 0);
    scenes.game.add(ambientLight);
    scenes.game.add(root);
    cameraAnimating = true;
    clearInputs();
    clearTexts();
    createInput();
    showText("Jakie to miasto?");
    const input = document.querySelector(".user-input");
    if (index === gameModels.length - 1) {
      nextButton.innerHTML = "Zakończ";
    }
  });
  const newModelName = gameModels[currentIndex].getName()
  const newSrcPredykcjaLink = getLinkForModel(newModelName + "_predykcja")
  const newSrcBezrobocieLink = getLinkForModel(newModelName + "_bezrobocie")
  plot_predykcja.src = newSrcPredykcjaLink;
  plot_bezrobocie.src = newSrcBezrobocieLink;
}
