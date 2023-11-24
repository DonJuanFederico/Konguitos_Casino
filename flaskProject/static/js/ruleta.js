window.anime = anime;

var currentBallRotation = 0;
var currentWheelRotation = 0;
var currentWheelIndex = 0;
var isRotating = false;
const rouletteWheelNumbers = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];

const getRouletteWheelNumber = index =>
  rouletteWheelNumbers[index >= 0 ? index % 37 : (37 - Math.abs(index % 37)) % 37];


const getRouletteWheelColor = index => {
  const i = index >= 0 ? index % 37 : 37 - Math.abs(index % 37);
  return i == 37 ? "green" : i % 2 == 0 ? "black" : "red";
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
  return (number, color) => {
    flipper.classList.add("flip", color);
    back.innerText = number;
  };
}

function startRotation(speed) {
  if (isRotating) {
    return;
  }

  isRotating = true;

 const nuevoDiv = document.createElement("div");
  nuevoDiv.innerHTML = "<div id=\"animacion\" class=\"animacionKoniguito\"></div>";

  const cuerpoDocumento = document.body;
  cuerpoDocumento.appendChild(nuevoDiv);
  setTimeout(() => {
    const writeResult = addFlipper();

    const bezier = [0.165, 0.84, 0.44, 1.005];
    const newWheelIndex = currentWheelIndex - speed;
    const result = getRouletteWheelNumber(newWheelIndex);
    const resultColor = getRouletteWheelColor(newWheelIndex);
    (() => {
      const newRotaion = currentWheelRotation + (360 / 37) * speed;
      console.log(getRouletteWheelNumber(currentWheelIndex), "---> ", result);
      var myAnimation = anime({
        targets: [".layer-2", ".layer-4"],
        rotate: function() {
          return newRotaion;
        },
        duration: function() {
          return 10000;
        },
        loop: 1,
        // easing: "cubicBezier(0.010, 0.990, 0.855, 1.010)",
        easing: `cubicBezier(${bezier.join(",")})`,
        // easing: "cubicBezier(0.000, 1.175, 0.980, 0.990)",
        complete: (...args) => {
          currentWheelRotation = newRotaion;
          currentWheelIndex = newWheelIndex;
        }
      });
    })();

    (() => {
      const newRotaion = -4 * 360 + currentBallRotation;
      var myAnimation1 = anime({
        targets: ".ball-container",
        translateY: [
          { value: 0, duration: 2000 },
          { value: 20, duration: 1000 },
          { value: 25, duration: 900 },
          { value: 50, duration: 1000 }
        ],
        rotate: [{ value: newRotaion, duration: 9000 }],
        duration: function() {
          return 7000; // anime.random(800, 1400);
        },
        loop: 1,
        easing: `cubicBezier(${bezier.join(",")})`,
        complete: () => {
          currentBallRotation = newRotaion;
          writeResult(result, resultColor);
          isRotating = false;
        }
      });
    })();}, 500);
}

document.querySelector(".roulette-wheel").addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);



/* ------------------------------------ APUESTAS ------------------------------------*/
let montosDinero = {};
let valorMoneda;
let moneda = "";

function colocarFicha(casilla, top, left, width, height) {
    // Verificar el rango del contador y actualizar la clase moneda
    const numero = casilla.className;

    if (!montosDinero[numero]) {
        montosDinero[numero] = 0;
    }

    montosDinero[numero] += valorMoneda;

    // Crear un div para la ficha
    const ficha = document.createElement('div');
    ficha.className = `${moneda}`;
    ficha.style.position = 'absolute';
    ficha.style.left = left + '%';
    ficha.style.top = top + '%';
    ficha.style.width = width + '%';
    ficha.style.height = height + '%';
    ficha.style.display = 'flex';
    ficha.style.flexDirection = 'column';
    ficha.style.alignItems = 'center';

    // Añadir el valor del dinero dentro de la ficha
    ficha.textContent = montosDinero[numero];

    // Agregar la ficha a la casilla
    casilla.appendChild(ficha);

    // Actualizar la clase moneda después de agregar la ficha
    if (montosDinero[numero] < 10) {
        moneda = 'moneda-cobre';
    } else if (10 <= montosDinero[numero] && montosDinero[numero] < 50) {
        moneda = 'moneda-plata';
    } else if (50 <= montosDinero[numero] && montosDinero[numero] < 100) {
        moneda = 'moneda-rubi';
    } else if (100 <= montosDinero[numero] && montosDinero[numero] < 250) {
        moneda = 'moneda-oro';
    } else if (250 <= montosDinero[numero]) {
        moneda = 'moneda-diamante';
    }

    // Actualizar el contenido dinámico en el contenedor de dinero
    const miContenedor = document.getElementById(`dineroApostado_${numero}`);
    const htmlDinamico = `<p>${montosDinero[numero]}</p>`;
    miContenedor.innerHTML = htmlDinamico;
    console.log("Dinero:", montosDinero[numero]);
}

function seleccionarMoneda(elemento) {
    // Obtener la clase de la moneda desde el elemento clicado
    moneda = elemento.className;
    if (moneda === 'moneda-cobre') {
        valorMoneda = 1;
    } else if (moneda === 'moneda-plata') {
        valorMoneda = 10;
    } else if (moneda === 'moneda-rubi') {
        valorMoneda = 50;
    } else if (moneda === 'moneda-oro') {
        valorMoneda = 100;
    } else if (moneda === 'moneda-diamante') {
        valorMoneda = 250;
    }
}
