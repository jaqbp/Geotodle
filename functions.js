import { CityModel3d } from "./classes";

export function createInput() {
  const input = document.createElement("input");
  input.classList.add("animation-fade-in2", "user-input");
  input.placeholder = "Jakie to miasto?";
  document.body.appendChild(input);
}

export function showText(content) {
  const textDiv = document.createElement("div");
  textDiv.classList.add(
    "animated-text",
    "animation-fade-in",
    "text",
    "text--medium",
    "text--center",
    "text--question",
  );
  textDiv.innerText = content;
  document.body.appendChild(textDiv);
}

export function createNextButton() {
  const button = document.createElement("button");
  button.classList.add("btn", "btn--next", "animation-fade-in");
  button.innerHTML = "Dalej";
  document.body.appendChild(button);
}

export function initializeModelsInGame() {
  const models = [
    new CityModel3d(
      "Halemba",
      "Najwspanialsza dzielnica",
      "models/halemba_model.gltf",
    ),
    new CityModel3d("Szczecin", "Masoneria i morze", "models/szczecin.gltf"),
    new CityModel3d(
      "Zakopiec",
      "Drogie parkingi i krokiew",
      "models/zakopiec.gltf",
    ),
    new CityModel3d(
      "Zamość",
      "Kawusia u Zamoyskiego i ładny rynek",
      "models/zamosc.gltf",
    ),
    new CityModel3d(
      "Warszawa",
      "JWP, Praga Północ, Stadion, PKIN i cyrk na Wiejskiej",
      "models/wawka.gltf",
    ),
    new CityModel3d(
      "Gliwice",
      "MS, Cyrk na Kujawskiej, troche rynku",
      "models/gliwice.gltf",
    ),
    new CityModel3d(
      "Kędzierzyn",
      "Miasto zajebistości no c'mon",
      "models/kedzierzyn.gltf",
    ),
  ];
  return shuffleArray(models);
}

export function clearInputs() {
  const existingInputs = document.querySelectorAll(".animation-fade-in2");
  existingInputs.forEach((input) => {
    document.body.removeChild(input);
  });
}

export function clearTexts() {
  const existingTexts = document.querySelectorAll(".animated-text");
  existingTexts.forEach((text) => {
    document.body.removeChild(text);
  });
}

/**
 *
 * @param {any[]} array
 * @returns  {any[]}
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
