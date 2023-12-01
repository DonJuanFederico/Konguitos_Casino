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

/*
------ Apuesta 4 números------
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

 ------ Apuesta 2 números ------
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
*/
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
    ficha.style.zIndex = 0;

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

    const apuestaEncontrada = arrayApuestas.find(apuesta => apuesta.nombre === tipo_apuesta);
    if (apuestaEncontrada) {
        apuestaEncontrada.valor += valorMoneda;
    } else {
        arrayApuestas.push({nombre: tipo_apuesta, valor: valorMoneda});
    }

    const valorFicha = document.createElement('div');
    valorFicha.textContent = valorMoneda; // Clear the existing content
    valorFicha.style.display = 'flex';
    valorFicha.style.position = 'fixed';
    valorFicha.style.flexDirection = 'column';
    valorFicha.style.alignItems = 'center';
    valorFicha.style.fontSize = '1em';
    valorFicha.style.zIndex = 10;
    valorFicha.style.color = 'black';

    casilla.appendChild(valorFicha);
    console.log("ha: ", apuestaEncontrada)
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

async function startRotation(speed) {
    let i = 1;
    let imagen = document.getElementById('KonguitoRuleta');

    setTimeout(() => {
        if (isRotating) {
            return;
        }

        isRotating = true;
        let writeResult = addFlipper();
        let bezier = [0.165, 0.84, 0.44, 1.005];
        let newWheelIndex = currentWheelIndex - speed;
        let result = getRouletteWheelNumber(newWheelIndex);
        let resultColor = getRouletteWheelColor(newWheelIndex);

        const newRotaion = currentWheelRotation + (360 / 37) * speed;
        var myAnimation = anime({
            targets: [".layer-2", ".layer-4"],
            rotate: function () {
                return newRotaion;
            },
            duration: function () {
                return 10000;
            },
            loop: 1,
            easing: `cubicBezier(${bezier.join(",")})`,
            complete: (...args) => {
                currentWheelRotation = newRotaion;
                currentWheelIndex = newWheelIndex;
            }
        });

        const newBallRotation = -4 * 360 + currentBallRotation;
        var myAnimation1 = anime({
            targets: ".ball-container",
            translateY: [
                {value: 0, duration: 2000},
                {value: 20, duration: 1000},
                {value: 25, duration: 900},
                {value: 50, duration: 1000}
            ],
            rotate: [{value: newBallRotation, duration: 9000}],
            duration: function () {
                return 7000;
            },
            loop: 1,
            easing: `cubicBezier(${bezier.join(",")})`,
            complete: () => {
                currentBallRotation = newBallRotation;
                writeResult(result, resultColor);
                isRotating = false;
            }
        });
        setTimeout(() => {
            calcularApuesta(result);
        },8500);
    }, 800);
    while (i <= 18) {
        imagen.src = `/static/images/ruleta/framesRuleta/${i}.png`;
        i++;
        await new Promise((resolve) => setTimeout(resolve, 75)); // Cambia el valor de 100 a la cantidad de milisegundos que desees
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
}


function calcularApuesta(resultado) {
    const apuesta1numero = arrayApuestas.filter(apuesta => apuesta.nombre === resultado);
    const apuesta1a18 = arrayApuestas.find(apuesta => apuesta.nombre === "1_to_18");
    const apuesta19a36 = arrayApuestas.find(apuesta => apuesta.nombre === "19_to_36");
    const apuestaPar = arrayApuestas.find(apuesta => apuesta.nombre === "par");
    const apuestaImpar = arrayApuestas.find(apuesta => apuesta.nombre === "impar");
    const apuestaRojo = arrayApuestas.find(apuesta => apuesta.nombre === "rojo");
    const apuestaNegro = arrayApuestas.find(apuesta => apuesta.nombre === "negro");
    const apuestaPrimeraDocena = arrayApuestas.find(apuesta => apuesta.nombre === "1_to_12");
    const apuestaSegundaDocena = arrayApuestas.find(apuesta => apuesta.nombre === "12_to_24");
    const apuestaTerceraDocena = arrayApuestas.find(apuesta => apuesta.nombre === "24_to_36");
    const apuestaPrimeraFila = arrayApuestas.find(apuesta => apuesta.nombre === "fila_1");
    const apuestaSegundaFila = arrayApuestas.find(apuesta => apuesta.nombre === "fila_2");
    const apuestaTerceraFila = arrayApuestas.find(apuesta => apuesta.nombre === "fila_3");

    let ganado = 0;
    let perdido = 0;
    const numero = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    const primeros_18_numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ];
    const segundos_18_numeros = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28 ,29 ,30 ,31 ,32 ,33 ,34 ,35 ,36];
    const par = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
    const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ,21 ,23 ,25 ,27 ,29 ,31 ,33 ,35];
    const rojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19 ,21 ,23 ,25 ,27 ,30 ,32 ,34 ,36];
    const negro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20 ,22 ,24 ,26 ,28 ,29 ,31 ,33 ,35];
    const primeraDocena = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10 ,11 ,12];
    const segundaDocena = [13, 14, 15, 16, 17, 18, 19, 20, 21 ,22 ,23 ,24];
    const terceraDocena = [25, 26, 27, 28, 29, 30, 31, 32, 33 ,34 ,35 ,36];
    const primeraFila =[3, 6, 9, 12, 15, 18, 21, 24, 27 ,30 ,33 ,36];
    const segundaFila = [2, 5, 8, 11, 14, 17, 20, 23, 26 ,29 ,32 ,35];
    const terceraFila = [1, 4, 7, 10, 13, 16, 19, 22, 25 ,28 ,31 ,34];
    let apuestas_perdidas = arrayApuestas
    console.log("h:", primeros_18_numeros.includes(resultado))
    console.log("a:", segundos_18_numeros.includes(resultado))
    if(primeros_18_numeros.includes(resultado)) {
        if (apuesta1a18) {
            ganado += (apuesta1a18.valor)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "1_to_18");
            console.log(`${resultado} está en la categoría: primeros_18 numeros`);
        }
    }
    if(segundos_18_numeros.includes(resultado)) {
        if (apuesta19a36) {
            ganado += (apuesta19a36.valor)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "19_to_36");
            console.log(`${resultado} está en la categoría: segundos_18 numeros`);
        }
    }
    if(par.includes(resultado)) {
        if (apuestaPar) {
            if (apuestaPar) {
                ganado += (apuestaPar.valor)
                apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "par");
                console.log(`${resultado} está en la categoría: Par`);
            }
        }
    }
    if(impar.includes(resultado)) {
        if (apuestaImpar) {
            ganado += (apuestaImpar.valor)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "impar");
            console.log(`${resultado} está en la categoría: Impar`);
        }
    }
    if (rojo.includes(resultado)) {
        if (apuestaRojo) {
            ganado += (apuestaRojo.valor)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "rojo");
            console.log(`${resultado} está en la categoría: rojo`);
        }
    }

    if (negro.includes(resultado)){
        if (apuestaNegro) {
            ganado += (apuestaNegro.valor)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "negro");
            console.log(`${resultado} está en la categoría: negro`);
        }
    }

    /* APUESTA A 12 NÚMEROS */
    if(primeraDocena.includes(resultado)){
        if(apuestaPrimeraDocena && apuestaSegundaDocena && apuestaTerceraDocena){
             ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaPrimeraDocena && apuestaSegundaDocena){
            ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaPrimeraDocena && apuestaTerceraDocena) {
            ganado += apuestaPrimeraDocena.valor + apuestaTerceraDocena.valor;
        } else if(apuestaPrimeraDocena){
            ganado += (apuestaPrimeraDocena.valor * 2)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "1_to_12");
            console.log(`${resultado} está en la categoría: primera docena`);
        }
    }
    if(segundaDocena.includes(resultado)) {
        if(apuestaPrimeraDocena && apuestaSegundaDocena && apuestaTerceraDocena){
             ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaPrimeraDocena && apuestaSegundaDocena){
            ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaSegundaDocena && apuestaTerceraDocena) {
            ganado += apuestaPrimeraDocena.valor + apuestaTerceraDocena.valor;
        } else if(apuestaSegundaDocena){
            ganado += (apuestaSegundaDocena.valor * 2)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "12_to_24");
            console.log(`${resultado} está en la categoría: segunda docena`);
        }
    }

    if(terceraDocena.includes(resultado)) {
        if(apuestaPrimeraDocena && apuestaSegundaDocena && apuestaTerceraDocena){
             ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaPrimeraDocena && apuestaTerceraDocena){
            ganado += apuestaPrimeraDocena.valor + apuestaSegundaDocena.valor;
        } else if(apuestaSegundaDocena && apuestaTerceraDocena) {
            ganado += apuestaPrimeraDocena.valor + apuestaTerceraDocena.valor;
        } else if(apuestaTerceraDocena){
        ganado += (apuestaTerceraDocena.valor * 2)
        apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "24_to_36");
        console.log(`${resultado} está en la categoría: tercera docena`);
        }
    }
    if (primeraFila.includes(resultado)) {
        if(apuestaPrimeraFila && apuestaSegundaFila && apuestaTerceraFila){
                ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaPrimeraFila && apuestaSegundaFila){
            ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaPrimeraFila && apuestaTerceraFila) {
            ganado += apuestaPrimeraFila.valor + apuestaTerceraFila.valor;
        } else if (apuestaPrimeraFila) {
            ganado += (apuestaPrimeraFila.valor * 2)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "fila_1");
            console.log(`${resultado} está en la categoría: tercera docena`);
        }
    }
    if(segundaFila.includes(resultado)) {
        if(apuestaPrimeraFila && apuestaSegundaFila && apuestaTerceraFila){
                ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaPrimeraFila && apuestaSegundaFila){
            ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaSegundaFila && apuestaTerceraFila) {
            ganado += apuestaSegundaFila.valor + apuestaTerceraFila.valor;
        } else if (apuestaSegundaFila) {
            ganado += (apuestaSegundaFila.valor * 2)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "fila_2");
            console.log(`${resultado} está en la categoría: tercera docena`);
        }
    }
    if(terceraFila.includes(resultado)) {
        if(apuestaPrimeraFila && apuestaSegundaFila && apuestaTerceraFila){
            ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaPrimeraFila && apuestaTerceraFila){
            ganado += apuestaPrimeraFila.valor + apuestaSegundaFila.valor;
        } else if(apuestaSegundaFila && apuestaTerceraFila) {
            ganado += apuestaPrimeraFila.valor + apuestaTerceraFila.valor;
        } else if (apuestaTerceraFila) {
            ganado += (apuestaTerceraFila.valor * 2)
            apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== "fila_3");
            console.log(`${resultado} está en la categoría: tercera docena`);
        }
    }
    console.log("1numero", apuesta1numero)
    console.log(apuesta1numero.valor)
    console.log("apuestas", arrayApuestas)
    if(apuesta1numero.includes(resultado)) {
        ganado += (apuesta1numero[0].valor * 36)
        apuestas_perdidas = apuestas_perdidas.filter(apuesta => apuesta.nombre !== resultado);
        console.log(`${resultado} está en la categoría: ${resultado}`);
    }
    console.log(apuestas_perdidas)


    perdido = apuestas_perdidas.reduce((acumulador, apuesta) => acumulador + apuesta.valor, 0);

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