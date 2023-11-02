const container = document.getElementById('scroll-container');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');
const buttonWidth = 100; // Ancho de cada botón
const containerWidth = buttonWidth * 3; // Ancho del contenedor
const totalButtons = 7; // Total de botones

let currentPosition = 0;

scrollLeftButton.addEventListener('click', () => {
    currentPosition -= 420
    updateScroll();
});

scrollRightButton.addEventListener('click', () => {
    currentPosition += 420
    updateScroll();
});

function updateScroll() {
    container.style.transform = `translateX(-${currentPosition}px)`;
}

var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.assign('http://127.0.0.1:5000/Inicio/')}