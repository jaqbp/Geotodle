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