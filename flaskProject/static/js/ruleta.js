var currentBallRotation = 0;
var currentWheelRotation = 0;
var currentWheelIndex = 0;
var isRotating = false;
const duration = 7000;
const rouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6,
  27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1,
  20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];


const ruletaCasillas = document.querySelector(".capa2-ruleta");
const ruletaCentro = document.querySelector(".capa4-ruleta");
const ball = document.querySelector(".ball-container");


const getRouletteWheelNumber = index =>
  rouletteWheelNumbers[index >= 0 ? index % 37 : 37 - Math.abs(index % 37)];

const getRouletteWheelColor = index => {
  const i = index >= 0 ? index % 37 : 37 - Math.abs(index % 37);
  return i === 0 ? "green" : i % 2 === 0 ? "black" : "red";
};

window.rouletteWheelNumbers = rouletteWheelNumbers;

function addFlipper() {
  const mkDiv = className => {
    const d = document.createElement("div");
    d.classList.add(...className.split(" "));
    return d;
  };
  const flipper = mkDiv("flipper");
  const front = mkDiv("front-face");
  const back = mkDiv("back-face");
  flipper.appendChild(front);
  flipper.appendChild(back);
  document.querySelector(".result").appendChild(flipper);
  return (number, color) => {
    flipper.classList.add("flip", color);
    back.innerText = number + " " + color;
    console.log(number);
    console.log(color);
  };
}

function startRotation(speed) {
  if (isRotating) return; // Si ya está girando, no hacer nada
  isRotating = true;

  const writeResult = addFlipper();

  //P0: (0.165,0.84) P1: (0.44,1.005)
  const bezier = [0.165, 0.84, 0.44, 1.005];

  const newWheelIndex = currentWheelIndex - speed;
  const result = getRouletteWheelNumber(newWheelIndex);
  const resultColor = getRouletteWheelColor(newWheelIndex);
  (() => {

    const newRotation = currentWheelRotation + (360 / 37) * speed;
    console.log(getRouletteWheelNumber(currentWheelIndex), "---> ", result);

    ruletaCasillas.style.transition = `transform ${duration}ms cubic-bezier(${bezier.join(",")})`;
    ruletaCentro.style.transition = `transform ${duration}ms cubic-bezier(${bezier.join(",")})`;

    ruletaCasillas.style.transform = `rotate(${newRotation}deg)`;
    ruletaCentro.style.transform = `rotate(${newRotation}deg)`;

    setTimeout(() => {
      ruletaCasillas.style.transition = "none";
      ruletaCentro.style.transition = "none";
      currentWheelRotation = newRotation;
      currentWheelIndex = newWheelIndex; // Set newWheelIndex as appropriate
    }, duration);
  })();

  (() => {
    const newRotation = -4 * 360 + currentBallRotation;
    console.log("newRotation", newRotation);

    // Configurar las propiedades iniciales para la animación
    const initialTranslateY = 0;
    const finalTranslateY = 30;
    const translateDuration = 5000;
    const rotateDuration = 1000;

    // Usar un temporizador para controlar la animación
    let startTime;

    // Función para actualizar la animación en cada fotograma
    /*function animate() {
      const currentTime = Date.now() - startTime;
      if (currentTime < translateDuration) {
        const progress = currentTime / translateDuration;
        const translateY = initialTranslateY + progress * (finalTranslateY - initialTranslateY);
        const rotation = (newRotation * progress) * (180 / Math.PI);
        ball.style.transform = `translateY(${translateY}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
      }
    }*/

    // Iniciar la animación de pelota
    startTime = Date.now();
    //animate();

    // Cuando la animación se completa
    setTimeout(() => {
      currentBallRotation = newRotation;
      // Realizar otras acciones aquí
      isRotating = false;
      // Llamar a una función para escribir resultados
      writeResult(result, resultColor);
    }, translateDuration);
  })();
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("girarRuleta").addEventListener("click", () => {
    startRotation(100);
  });
});

var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.assign('http://127.0.0.1:5000/Juegos/')}