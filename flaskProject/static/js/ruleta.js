/* ------------------------------------ APUESTAS ------------------------------------*/


/* ------ Apuesta 18 numeros ------ */
function apuesta_18_numeros(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, 10, 10, 80, 80);
}


/* ------ Apuesta 12 numeros ------ */
function apuesta_12_numeros(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, 5, 30, 35, 90);
}

/* ------ Apuesta 12 números por fila ------ */
function apuesta_12_numeros_2_1(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, 20, 20, 70, 70);
}

/* ------ Apuesta 4 números------ */
function apuesta_4_numeros(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, -75, -75, 250, 250);
}


var resultadoContainer = document.getElementById('4_numeros');

    // Bucle for que genera números del 1 al 36 con incremento de 3
for (var i = 1; i <= 34; i += 3) {
    // Crea un nuevo elemento div
    var nuevoDiv1 = document.createElement('div');
    var nuevoDiv2 = document.createElement('div');

    // Agrega la clase "apuesta" al nuevo div
    nuevoDiv1.className = 'apuesta';
    nuevoDiv2.className = 'apuesta';

      // Agrega los números al atributo data-numero
    nuevoDiv1.setAttribute('data-numero', (i) + '_' + (i + 1) + '_' + (i + 3) + '_' + (i+4)); //1_2_4_5
    nuevoDiv2.setAttribute('data-numero', (i+1) + '_' + (i + 2) + '_' + (i + 4) + '_' + (i+5)); //2_3_5_6

    nuevoDiv1.setAttribute('onclick', 'apuesta_4_numeros(this)');
    nuevoDiv2.setAttribute('onclick', 'apuesta_4_numeros(this)');

    nuevoDiv1.setAttribute('style', 'width: 2%; height: 3%; top:41%;'); //  background-color: white;
    nuevoDiv2.setAttribute('style', 'width: 2%; height: 3%; top:21%;');
      // Agrega el nuevo div al contenedor
    if(i < 34){
        resultadoContainer.appendChild(nuevoDiv1);
        resultadoContainer.appendChild(nuevoDiv2);
    }
}

/* ------ Apuesta 2 números ------ */
function apuesta_2_numeros(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, -20,0,75,150)
}


var resultadoContainer = document.getElementById('2_numeros');

    // Bucle for que genera números del 1 al 36 con incremento de 3
for (var i = 1; i <= 34; i += 3) {
    // Crea un nuevo elemento div
    var nuevoDiv1 = document.createElement('div');
    var nuevoDiv2 = document.createElement('div');
    var nuevoDiv3 = document.createElement('div');
    var nuevoDiv4 = document.createElement('div');
    var nuevoDiv5 = document.createElement('div');
    var nuevoDiv6 = document.createElement('div');

    // Agrega la clase "apuesta" al nuevo div
    nuevoDiv1.className = 'apuesta';
    nuevoDiv2.className = 'apuesta';
    nuevoDiv3.className = 'apuesta';
    nuevoDiv4.className = 'apuesta';
    nuevoDiv5.className = 'apuesta';
    nuevoDiv6.className = 'apuesta';

      // Agrega los números al atributo data-numero
    nuevoDiv1.setAttribute('data-numero', i + '_' + (i + 1)); //1_2
    nuevoDiv2.setAttribute('data-numero', (i + 1) + '_' + (i + 2)); //2_3
    nuevoDiv3.setAttribute('data-numero', (i + 2) + '_' + (i + 3));
    nuevoDiv4.setAttribute('data-numero', i + '_' + (i + 3)); //1_4
    nuevoDiv5.setAttribute('data-numero', (i+1) + '_' + (i + 4)); //2_5
    nuevoDiv6.setAttribute('data-numero', (i + 2) + '_' + (i + 5));//3_6

    nuevoDiv1.setAttribute('onclick', 'apuesta_2_numeros(this)');
    nuevoDiv2.setAttribute('onclick', 'apuesta_2_numeros(this)');
    nuevoDiv3.setAttribute('onclick', 'apuesta_2_numeros(this)');
    nuevoDiv4.setAttribute('onclick', 'apuesta_2_numeros(this)');
    nuevoDiv5.setAttribute('onclick', 'apuesta_2_numeros(this)');
    nuevoDiv6.setAttribute('onclick', 'apuesta_2_numeros(this)');

    nuevoDiv1.setAttribute('style', 'width: 6%; height: 3%; top:41%;');
    nuevoDiv2.setAttribute('style', 'width: 6%; height: 3%; top:21%;');
    nuevoDiv4.setAttribute('style', 'width: 2%; height: 21%; top:42%;');
    nuevoDiv5.setAttribute('style', 'width: 2%; height: 19%; top:22%;');
    nuevoDiv6.setAttribute('style', 'width: 2%; height: 19%; top:2%;');
      // Agrega el nuevo div al contenedor
    resultadoContainer.appendChild(nuevoDiv1);
    resultadoContainer.appendChild(nuevoDiv2);
    resultadoContainer.appendChild(nuevoDiv3);
    if(i < 34){
        resultadoContainer.appendChild(nuevoDiv4);
        resultadoContainer.appendChild(nuevoDiv5);
        resultadoContainer.appendChild(nuevoDiv6);
    }
}

/* ------ Apuesta 1 número ------ */
function apuesta_1_numeros(casilla) {
    const numeroApuesta = casilla.getAttribute("data-numero");
    colocarFicha(casilla, 15,20,70,70)
}


var resultadoContainer = document.getElementById('1_numero');

    // Bucle for que genera números del 1 al 36 con incremento de 3
for (var i = 1; i <= 36; i+=3) {
    // Crea un nuevo elemento div
    var nuevoDiv1 = document.createElement('div');
    var nuevoDiv2 = document.createElement('div');
    var nuevoDiv3 = document.createElement('div');
    // Agrega la clase "apuesta" al nuevo div
    nuevoDiv1.className = 'apuesta';
    nuevoDiv2.className = 'apuesta';
    nuevoDiv3.className = 'apuesta';

      // Agrega los números al atributo data-numero
    nuevoDiv1.setAttribute('data-numero',i); //1
    nuevoDiv2.setAttribute('data-numero',i+1); //2
    nuevoDiv3.setAttribute('data-numero',i+2); //3

    nuevoDiv1.setAttribute('onclick', 'apuesta_1_numeros(this)');
    nuevoDiv2.setAttribute('onclick', 'apuesta_1_numeros(this)');
    nuevoDiv3.setAttribute('onclick', 'apuesta_1_numeros(this)');

    nuevoDiv1.setAttribute('style', 'width: 6%; height:19%; top:44%;');
    nuevoDiv2.setAttribute('style', 'width: 6%; height:19%; top:24%;');
    nuevoDiv3.setAttribute('style', 'width: 6%; height:19%; top:2%;'); //background-color: white;

    resultadoContainer.appendChild(nuevoDiv1);
    resultadoContainer.appendChild(nuevoDiv2);
    resultadoContainer.appendChild(nuevoDiv3);
}


/* ------ Colocar ficha ------ */

var apuesta = "";
let valor = 0;
var arrayApuestas = [
    {nombre: apuesta , valor: valor}
]
let valorMoneda = 0;
let moneda = "";

function colocarFicha(casilla, top, left, width, height) {
    // Verificar el rango del contador y actualizar la clase moneda
    const className = casilla.className;
    const tipo_apuesta = casilla.getAttribute("data-numero");
    array = ['1_4','4_7','7_10','10_13','13_16','16_19','19_22','22_25','25_28','28_31','31_34',
    '2_5','5_8','8_11','11_14','14_17','17_20','20_23','23_26','26_29','29_32','32_35',
    '3_6','6_9','9_12','12_15','15_18','18_21','21_24','24_27','27_30','30_33','33_36']
    if (array.includes(tipo_apuesta)) {
        top = 40;
        left = -60;
        width = 250;
        height = 25;
    }

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

    casilla.appendChild(ficha);
    tipo_moneda = ficha.className
    if (tipo_moneda === 'moneda-cobre') {
        valorMoneda = 1;
    } else if (tipo_moneda === 'moneda-plata') {
        valorMoneda = 10;
    } else if (tipo_moneda === 'moneda-rubi') {
        valorMoneda = 50;
    } else if (tipo_moneda === 'moneda-oro') {
        valorMoneda = 100;
    } else if (tipo_moneda === 'moneda-diamante') {
        valorMoneda = 250;
    } else {
        valorMoneda = 0;
    }

    var apuestaEncontrada = arrayApuestas.find(apuesta => apuesta.nombre === tipo_apuesta);
    if (apuestaEncontrada) {
        apuestaEncontrada.valor += valorMoneda;
    } else {
        arrayApuestas.push({nombre: tipo_apuesta, valor: valorMoneda});
    }
    console.log("arrayApuestas", arrayApuestas);
}

/* ------ Seleccionar moneda, Cambia de valor la variable moneda para colocar  ------ */
function seleccionarMoneda(elemento) {
    // Obtener la clase de la moneda desde el elemento clicado
    moneda = elemento.className;
}

/* -------- Ruleta -------- */

window.anime = anime;

var currentBallRotation = 0;
var currentWheelRotation = 0;
var currentWheelIndex = 0;
var isRotating = false;
const rouletteWheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13,
  36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
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
    speed = 50;
  if (isRotating) {
    return;
  }

  isRotating = true;

 const nuevoDiv = document.createElement("div");
  nuevoDiv.innerHTML = "<div id=\"animacion\" class=\"animacionKoniguito\"></div>";

  const cuerpoDocumento = document.body;
  cuerpoDocumento.appendChild(nuevoDiv);
   let writeResult = addFlipper();
    let bezier = [0.165, 0.84, 0.44, 1.005];
    let newWheelIndex = currentWheelIndex - speed;
    let result = getRouletteWheelNumber(newWheelIndex);
    let resultColor = getRouletteWheelColor(newWheelIndex);
  setTimeout(() => {
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
    })();
    }, 500);
  setTimeout(() => {
        calcularApuesta(result);
    },500);
}

function calcularApuesta(resultado) {
    var apuestasEncontradas = arrayApuestas.filter(apuesta => apuesta.nombre.includes(resultado));
    var apuestasNoEncontradas = arrayApuestas.filter(apuesta => !apuestasEncontradas.includes(apuesta));
    console.log("apuestasEncontradas", apuestasEncontradas);
    console.log("apuestasNoEncontradas", apuestasNoEncontradas);
    let ganado = 0;
    let perdido = 0;
    if(apuestasNoEncontradas.length > 0){
        for(var apuestaPerdida of apuestasNoEncontradas){
            perdido += apuestaPerdida.valor;
        }
    }
    if (apuestasEncontradas.length > 0) {
        for (var apuestaGanada of apuestasEncontradas) {
            if (apuestaGanada.nombre == resultado) { // Apuesta a un número
                ganado = apuestaGanada.valor * 35;
            }
        }
    } else {
        console.log("No hay apuestas");
    }
    console.log("ganado", ganado);
    console.log("perdido", perdido);
    agregarDinero(ganado)
    retirarDinero(perdido)
}

function agregarDinero(ganado) {
    let dineroUsuarioElement = document.querySelector('#monedasUsuario');
    dineroUsuarioElement.textContent = parseFloat(dineroUsuarioElement.textContent) + ganado;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + ganado);
}

function retirarDinero(perdido) {
    let dineroUsuarioElement = document.querySelector('#monedasUsuario');
    dineroUsuarioElement.textContent = parseFloat(dineroUsuarioElement.textContent) - perdido;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + perdido);
}

function volverAtras(){document.location.href = '/Juegos/';}