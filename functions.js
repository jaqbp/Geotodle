import { CityModel3d } from "./classes";

export function createInput() {
  const input = document.createElement("input");
  input.classList.add("animation-fade-in2", "user-input");
  input.placeholder = "Jakie to miasto?";
  document.body.appendChild(input);
}

export function getLinkForModel(modelName) {
  const modelNameToLink = {
    "Gliwice_predykcja": "//plotly.com/~bartsmo430/93.embed",
    "Gliwice_bezrobocie": "//plotly.com/~bartsmo430/107.embed",
    "Kędzierzyn-Koźle_predykcja": "//plotly.com/~bartsmo430/95.embed",
    "Kędzierzyn-Koźle_bezrobocie": "//plotly.com/~bartsmo430/109.embed",
    "Ruda Śląska_predykcja": "//plotly.com/~bartsmo430/97.embed",
    "Ruda Śląska_bezrobocie": "//plotly.com/~bartsmo430/111.embed",
    "Zamość_predykcja": "//plotly.com/~bartsmo430/99.embed",
    "Zamość_bezrobocie": "//plotly.com/~bartsmo430/113.embed",
    "Warszawa_predykcja": "//plotly.com/~bartsmo430/101.embed",
    "Warszawa_bezrobocie": "//plotly.com/~bartsmo430/115.embed",
    "Zakopane_predykcja": "//plotly.com/~bartsmo430/103.embed",
    "Zakopane_bezrobocie": "//plotly.com/~bartsmo430/117.embed",
    "Szczecin_predykcja": "//plotly.com/~bartsmo430/105.embed",
    "Szczecin_bezrobocie": "//plotly.com/~bartsmo430/119.embed",
  }
  return modelNameToLink[modelName] || "";
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
      "Ruda Śląska",
      "Halemba",
      "models/halemba_model.gltf",
    ),
    new CityModel3d(
      "Szczecin",
      "Masoneria i morze",
      "models/szczecin.gltf"
    ),
    new CityModel3d(
      "Zakopane",
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
      "Kędzierzyn-Koźle",
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
