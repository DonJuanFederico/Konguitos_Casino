/* ---------- Alertas ---------- */
function reglas() {
    Swal.fire({
        title: 'Reglas',
        html: "<div style='text-align: center;'>" +
            "1. Se escoje la ficha que se quiere apostar" +
            "<br>2. Se escoje la casilla a la que se quiere apostar" +
            "<br>1to18: 1 a 18" +
            "<br>19to36: 19 a 36" +
            "<br>even: pares" +
            "<br>odd: impares" +
            "<br>red: rojos" +
            "<br>black: negro" +
            "<br> 1st 12: 1 a 12" +
            "<br> 2nd 12: 13 a 24" +
            "<br> 3rd 12: 25 a 36" +
            "<br> 3. Pulsa el botón girar",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}


function recompensas() {
    Swal.fire({
        title: 'Recompensas',
        html: "<div style='text-align: center;'></div>" +
            "<br> 36 números: 1 a 1" +
            "<br> 24 números: 1 a 1" +
            "<br> 18 números: 1 a 1" +
            "<br> 12 números: 2 a 1" +
            "<br> 1 número: 35 a 1",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}

function leyenda() {
    Swal.fire({
        title: 'LEYENDA',
        html: "<div style='text-align: center;'>" +
            " Este es el valor de cada moneda" +
            "<h3>Monedas:</h3>" +
            "<img src='/static/images/monedaCobre.png' style='width: 10%'> 1 KC </br>" +
            "<img src='/static/images/moneda.png' style='width: 10%'> 10 KC </br>" +
            "<img src='/static/images/monedaRubi.png' style='width: 10%'> 50 KC </br>" +
            "<img src='/static/images/moneda_dorada.png' style='width: 10%'> 100 KC </br>" +
            "<img src='/static/images/monedaDiamante.png' style='width: 10%'> 250 KC </br>" +
            "</div>",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}
/* ---------- Tiempo para apostar ---------- */
function iniciarTemporizador(tiempoInicial) {

    var tiempoApostar = document.createElement('div');
    tiempoApostar.id = 'tiempoApostar';
    document.body.appendChild(tiempoApostar);

    var quizTimerElement = document.createElement('div');
    quizTimerElement.id = 'quiz-time-left';
    document.body.appendChild(quizTimerElement);

    var countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    document.body.appendChild(countdownElement);

    var fechaFinalizacion = new Date().getTime() + tiempoInicial * 1000;

    var temporizador = setInterval(function() {
        var tiempoRestante = Math.floor((fechaFinalizacion - new Date().getTime()) / 1000);
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            countdownElement.innerHTML = "¡Apuestas cerradas!";
            setTimeout(function() {
                countdownElement.innerHTML = '¡Apuestas aceptadas!';
            }, 2000);
            setTimeout(function() {
                countdownElement.innerHTML = 'Girando';
            }, 4000);
            setTimeout(function() {
                countdownElement.innerHTML= 'Ha salido: 2 negro.';
            }, 6000);
        } else {
            var minutos = Math.floor(tiempoRestante / 60);
            var segundos = tiempoRestante % 60;
            var cantidad = segundos < 10 ?  + segundos : segundos;
            countdownElement.textContent = "Quedan " + cantidad + "para apostar";
        }
    }, 0);
}
/* ---------- Apuestas ----------*/
var apuesta_2_1_primera = document.getElementById('apuesta_2_1_primera');
var apuesta_2_1_segunda = document.getElementById('apuesta_2_1_segunda');
var apuesta_2_1_tercera = document.getElementById('apuesta_2_1_tercera');
var apuesta_1_12 = document.getElementById('apuesta_1_12');
var apuesta_13_24 = document.getElementById('apuesta_13_24');
var apuesta_25_36 = document.getElementById('apuesta_25_36');
var apuesta_1_18 = document.getElementById('apuesta_1_18');
var apuesta_par = document.getElementById('apuesta_par');
var apuesta_negro = document.getElementById('apuesta_negro');
var apuesta_rojo = document.getElementById('apuesta_rojo');
var apuesta_impar = document.getElementById('apuesta_impar');
var apuesta_19_36 = document.getElementById('apuesta_19_36');

var negro  = document.getElementsByClassName('negro');
var rojo = document.getElementsByClassName('rojo');
const arrayNumeros = [];

for (const elementoRojo of rojo) {
    const clase = elementoRojo.getAttribute("class");
    const matchRojo = clase.match(/numero rojo (\d+) (\w+)/);
    if (matchRojo) {
        const numero = matchRojo[1];
        const textoExtra = matchRojo[2];
        const color = "rojo"; // Additional text, like "dos"
        arrayNumeros.push([numero, color, textoExtra]);
    }
}
// Agregar elementos de 'negro' al nuevo array
for (const elementoNegro of negro) {
    const clase = elementoNegro.getAttribute("class");
    const matchNegro = clase.match(/numero negro (\d+) (\w+)/);
    if (matchNegro) {
        const numero = matchNegro[1];
        const textoExtra = matchNegro[2];
        const color ="negro"; // Additional text, like "dos"
        arrayNumeros.push([numero, color, textoExtra]);
    }
}
// [ "8", "negro", "ocho"]


/* ---------- Metodos a Iluminar ---------- */
function cambiarColorRojo(casilla){
    var elemento = document.getElementsByClassName(casilla)
    elemento.item(0).style.backgroundColor = "#f53535";
}
function cambiarColorNegro(casilla){
    var elemento = document.getElementsByClassName(casilla)
    elemento.item(0).style.backgroundColor = "#2f2d2d";
}

function volverAlOriginal(){
    for (const casilla of arrayNumeros) {
        var elemento = document.getElementsByClassName(casilla[2])
        elemento.item(0).style.backgroundColor = "";
    }
}

function iluminarCasillas(casilla){
    if (casilla[1] === "negro") {
        cambiarColorNegro(casilla[2])
    } else if (casilla[1] === "rojo") {
        cambiarColorRojo(casilla[2])
    }
}

/*---------- primera fila ---------*/
apuesta_2_1_primera.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0]%3 === 0) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_2_1_primera.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- segunda fila ---------*/
apuesta_2_1_segunda.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0]%3 === 2) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_2_1_segunda.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- tercera fila ---------*/
apuesta_2_1_tercera.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0]%3 === 1) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_2_1_tercera.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- 1_12----------*/
apuesta_1_12.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0] <= 12) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_1_12.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- 13_24----------*/
apuesta_13_24.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if((13 <= casilla[0]) && ( casilla[0] <= 24)){
            iluminarCasillas(casilla)
        }
    }
});
apuesta_13_24.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- 25_36----------*/
apuesta_25_36.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0] >= 25) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_25_36.addEventListener("mouseout", function () {
    volverAlOriginal();
});
/*---------- 1_18 ----------*/
apuesta_1_18.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0] <= 18) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_1_18.addEventListener("mouseout", function () {
    volverAlOriginal();
});

/*---------- Par ----------*/
apuesta_par.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0]%2 === 0) {
            iluminarCasillas(casilla)
        }
    }
});

apuesta_par.addEventListener("mouseout", function (){
    volverAlOriginal();
})
/*---------- Negro ----------*/
apuesta_negro.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[1] === "negro") {
            iluminarCasillas(casilla);
        }
    }
});

apuesta_negro.addEventListener("mouseout", function (){
    volverAlOriginal();
})
/*---------- Rojo --------*/
apuesta_rojo.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[1] === "rojo") {
            iluminarCasillas(casilla);
        }
    }
});

apuesta_rojo.addEventListener("mouseout", function (){
    volverAlOriginal();
})

/*---------- Impar ---------*/
apuesta_impar.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0]%2 === 1) {
            iluminarCasillas(casilla)
        }
    }
});

apuesta_impar.addEventListener("mouseout", function (){
    volverAlOriginal();
})

/*---------- 19_36 ----------*/
apuesta_19_36.addEventListener("mouseover", function () {
    for (const casilla of arrayNumeros) {
        if(casilla[0] >= 19) {
            iluminarCasillas(casilla)
        }
    }
});
apuesta_19_36.addEventListener("mouseout", function (){
    volverAlOriginal();
})

/*---------- SALDO ----------*/
function apostar(tipo) {
    if(tipo === "0"){
        alert("No se puede apostar a 0");
    }else{
        asignar_valor_moneda(monedaElejida); //Obtengo valorMoneda en f() de la moneda seleccionada
        obtener_array_apuestas(tipo, valorMoneda); //Obtengo a que casilla se ha apostado y cuánta cantidad en una array bidimensional
        colocar_moneda_con_valor_apostado_en_casilla(arrayApuestas, monedaElejida, tipo); //Coloco la moneda en la casilla

    }
}

/* ---------- colocarBrodeMoneda, asignarValorMoneda, ---------- */
let monedaElejida;
let valorMoneda;

function colocarBordeMoneda(moneda){
    /* ---- COLOCAR BORDE ---- */
    const clasesMonedas = [
        'cobre', 'plata', 'rubi', 'oro', 'diamante',
        'quitarTodasApuestas','eliminarFicha', 'duplicarApuesta', 'repetirApuesta'];

    // Eliminar el borde de todas las monedas
    document.querySelectorAll('.moneda').forEach(otraMoneda => {
        otraMoneda.style.border = "none";
    });
    monedaElejida = moneda.classList;

    //Colocar el borde a la moneda seleccionada
    if (clasesMonedas.some(clase => monedaElejida)) {
        moneda.style.border = "3px solid white";
    }
}

function asignar_valor_moneda(monedaElejida){
    if(monedaElejida === undefined){
        valorMoneda = 0;
    }else{
        if (monedaElejida.contains('cobre')) {
            valorMoneda = 1;
        } else if (monedaElejida.contains('plata')) {
            valorMoneda = 10;
        } else if (monedaElejida.contains('rubi')) {
            valorMoneda = 50;
        } else if (monedaElejida.contains('diamante')) {
            valorMoneda = 100;
        } else if (monedaElejida.contains('oro')) {
            valorMoneda = 250;
        } else {
            valorMoneda = 0;
        }
    }
}

let arrayApuestas = [];

function obtener_array_apuestas(tipo, cantidadApostada) {
    const index = arrayApuestas.findIndex(apuesta => apuesta[0] === tipo);
    if(valorMoneda === 0){
        alert("No has seleccionado ninguna moneda");
    } else {
        if (index !== -1) {
            arrayApuestas[index][1] += cantidadApostada;
        } else {
            arrayApuestas.push([tipo, cantidadApostada]);
        }
    }
    console.log(arrayApuestas);
}
let valorAcumulado = 0
function colocar_moneda_con_valor_apostado_en_casilla(arrayApuestas, tipo_moneda, tipo) {
    console.log("-------------------------------------------")
    for (const apuesta of arrayApuestas) {
        if (apuesta[0] === tipo) {
            valorAcumulado = apuesta[1];
        }
    }
    if (valorAcumulado === 0) {
    } else {
        const tipoMoneda = tipo_moneda[1];
        const div = document.createElement('div');
        divTexto = div;
        div.className = tipoMoneda;
        div.style.position = 'absolute';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.alignItems = 'center';
        div.style.zIndex = '0';
        div.innerHTML = valorAcumulado;
        div.style.color = '#ffffff';
        div.style.fontWeight = 'bold';
        div.style.position = 'absolute';
        div.style.zIndex = '1';
        div.style.fontSize = '70%';
        div.style.top = '100%';
        elementosss = tipo;
        if (elementosss === 'apuesta_1_18' || elementosss === 'apuesta_19_36'
            || elementosss === "apuesta_par" || elementosss === "apuesta_impar"
            || elementosss === "apuesta_rojo" || elementosss === "apuesta_negro") {
            div.style.top = '5%';
            div.style.left = '25%';
            div.style.width = '50%';
            div.style.height = '90%';
        } else if (elementosss === "apuesta_1_12" || elementosss === "apuesta_13_24" || elementosss === "apuesta_25_36") {
            div.style.top = '10%';
            div.style.left = '35%';
            div.style.width = '20%';
            div.style.height = '80%';
        } else {
            div.style.top = '10%';
            div.style.left = '10%';
            div.style.width = '80%';
            div.style.height = '80%';
        }
        const tipoElement = document.getElementById(tipo);

        // Check if the element exists before appending children
        if (tipoElement) {
            tipoElement.appendChild(divTexto);
            tipoElement.appendChild(div);
        } else {
            console.error('Element with ID ' + tipo + ' not found.');
        }
    }
}


/* ---------- MarcoSaldo ---------- */
document.getElementById("botonComprarMonedas").addEventListener("click", function () {
    window.location.href = "/dinero/";
});

function volverAtras(){
    document.location.href = '/Juegos/';
}