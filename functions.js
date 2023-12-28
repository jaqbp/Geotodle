import { CityModel3d } from "./classes";

export function createInput() {
    const input = document.createElement('input');
    input.classList.add('animated-input');
    input.style.position = 'absolute';
    input.style.bottom = '20px';
    input.style.left = '50%';
    input.style.transform = 'translateX(-50%)';
    input.style.zIndex = 1000;
    input.style.width = '300px';
    input.style.height = '50px';
    input.style.border = '2px solid black';
    input.style.borderRadius = '10px';
    input.style.padding = '10px';
    input.style.fontSize = '20px';
    input.style.fontFamily = 'Outfit, sans-serif';
    input.style.textAlign = 'center';
    input.style.color = 'black';
    input.style.backgroundColor = 'white';
    input.placeholder = 'Jakie to miasto?';
    document.body.appendChild(input);
}

export function showText(content) {
    const textDiv = document.createElement('div');
    textDiv.classList.add('animated-text');
    textDiv.style.position = 'absolute';
    textDiv.style.top = '40px';
    textDiv.style.width = '100%';
    textDiv.style.textAlign = 'center';
    textDiv.style.color = 'white';
    textDiv.style.fontSize = '50px';
    textDiv.style.fontFamily = 'Outfit, sans-serif';
    textDiv.innerHTML = content;
    document.body.appendChild(textDiv);
}

export function createNextButton() {
    const button = document.createElement('button');
    button.classList.add('animated-button');
    button.style.position = 'absolute';
    button.style.bottom = '40px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-30%)';
    button.style.zIndex = 1000;
    button.style.width = '300px';
    button.style.height = '50px';
    button.style.border = '2px solid black';
    button.style.borderRadius = '10px';
    button.style.padding = '40px';
    button.style.fontSize = '20px';
    button.style.fontFamily = 'Outfit, sans-serif';
    button.style.textAlign = 'center';
    button.style.color = 'black';
    button.style.backgroundColor = 'white';
    button.innerHTML = 'Dalej';
    document.body.appendChild(button);

}

export function initializeModelsInGame(pathToSetOfModels) {
    let modelsInGame = [];
    const models = [
        new CityModel3d('Halemba', 'Najwspanialsza dzielnica', 'models/halemba_model.gltf'),
        new CityModel3d('Szczecin', 'Masoneria i morze', 'models/szczecin.gltf'),
        new CityModel3d('Zakopiec', 'Drogie parkingi i krokiew', 'models/zakopiec.gltf'),
        new CityModel3d('Zamość', 'Kawusia u Zamoyskiego i ładny rynek', 'models/zamosc.gltf'),
        new CityModel3d('Warszawa', 'JWP, Praga Północ, Stadion, PKIN i cyrk na Wiejskiej', 'models/wawka.gltf'),
        new CityModel3d('Gliwice', 'MS, Cyrk na Kujawskiej, troche rynku', 'models/gliwice.gltf'),
        new CityModel3d('Kędzierzyn', 'Miasto zajebistości no c\'mon', 'models/kedzierzyn.gltf'),
    ]
    modelsInGame = shuffleArray(models);
    return modelsInGame;
}

export function clearInputs() {
    const existingInputs = document.querySelectorAll('.animated-input');
    existingInputs.forEach(input => {
        document.body.removeChild(input);
    });
}

export function clearTexts() {
    const existingTexts = document.querySelectorAll('.animated-text');
    existingTexts.forEach(text => {
        document.body.removeChild(text);
    });
}

export function clearButtons() {
    const existingButtons = document.querySelectorAll('.animated-button');
    existingButtons.forEach(button => {
        document.body.removeChild(button);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}




