const konguitoDino = document.getElementById("konguitoDino");
const fondoDinamico = document.getElementById("fondoDinamico");
const contenedorJuego = document.getElementById("contenedorJuego");
const botonIniciarPausar = document.getElementById("botonIniciarPausar");
const tiempoFrame = 90; //Velocidad en milisegundos

let intervalosMultiplicador;
let pararJuego;
let cantidadApostada;
let limiteApostado;
let incremento = 0;
let multiplicador = 0.95;
let recompensa = 1;
let inicio = 0;
let numeroImagen = 1;

let imagenKonguitoDino = document.getElementById('imagenKonguitoDino');

//Nada mas cargar la página se ejecuta esta función
stopAnimation();

document.addEventListener("DOMContentLoaded", () => generarLimite());

document.getElementById("botonRetirarApuesta").addEventListener("click", () => {
    if (inicio === 1) retirarse(1);
});

document.getElementById("imagenKonguitosCasino").addEventListener("click", function() {
    window.location.href = "/Juegos";
});

document.getElementById("botonComprarMonedas").addEventListener("click", function() {
    window.location.href = "/dinero/";
});

function stopAnimation(){
    fondoDinamico.style.animationPlayState = "paused";
    konguitoDino.style.animationPlayState = "paused";
    incremento = 0;
}
contenedorJuego.addEventListener("click", () => {
    konguitoDino.classList.add("desplazamientoKonguitoDino");
});

konguitoDino.addEventListener("animationend", () => {
    konguitoDino.classList.remove("desplazamientoKonguitoDino");
});


function resumeGame(){
    reanudarAnimation();
    reanudarMarcador();

}

function reanudarAnimation(){
    fondoDinamico.style.animationPlayState = "running";
    konguitoDino.style.animationPlayState = "running";
    incremento = 1;
}

function reanudarMarcador(){
    intervalosMultiplicador = setInterval(() => {
        if(getComputedStyle(konguitoDino).animationPlayState === "running"){
            multiplicador = multiplicador + 0.01;
            recompensa = cantidadApostada * multiplicador;
        }
        document.getElementById("valorMultiplicador").innerText = multiplicador.toFixed(2);
        recompensa = Math.floor(recompensa * 100) / 100; // Trunca a dos decimales. No los aproxima
        document.getElementById("recompensa").innerText = recompensa.toFixed(2);
    }, 50);
}

botonIniciarPausar.addEventListener("click", () => {
    if(!botonIniciarPausar.classList.contains("pausa")){
        posibleCantidad = parseFloat(document.getElementById("cantidadApostada").value);
        //Ya ha apostado anteriormente, y solo reanuda el juego
        if(inicio > 0) {
                resumeGame();
        }else {
            //Comprobar que los valores que introduce al apostar tienen sentido
            if (posibleCantidad >= (0.01) && document.getElementById("limiteApostado").value >= 1.01) {
                if (posibleCantidad - parseFloat(posibleCantidad.toFixed(2)) == 0) {
                    if (parseFloat(document.getElementById("cantidadApostada").value) <= parseFloat(document.getElementById("monedasUsuario").innerText)) {
                        //Primera vez que le da al play en la partida
                        if (inicio === 0) {
                            cantidadApostada = parseFloat(document.getElementById("cantidadApostada").value);
                            limiteApostado = parseFloat(document.getElementById("limiteApostado").value);
                            inicio++;
                            //Quitar el dinero de la cuenta y mostrarlo en el marcado:
                            retirarDinero();
                            contenedorMonedasUsuario = document.getElementById("monedasUsuario");
                            contenedorMonedasUsuario.innerText = Math.round((parseFloat(contenedorMonedasUsuario.innerText) - cantidadApostada) * 100) / 100;
                        }
                        //Reanudar el juego.
                        resumeGame();
                    } else {
                        botonIniciarPausar.classList.toggle("pausa");
                        alert("Cantidad insuficiente");
                    }
                } else {
                    //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
                    botonIniciarPausar.classList.toggle("pausa");
                    alert("Dos decimales solo");
                    document.getElementById("cantidadApostada").value = 0.01;
                    document.getElementById("limiteApostado").value = 1.01;
                }
            } else {
                //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
                botonIniciarPausar.classList.toggle("pausa");
                alert("NADA DE APUESTAS NEGATIVAS Y LÍMITES SIN SENTIDO. ¡JUEGA LIMPIO!");
                document.getElementById("cantidadApostada").value = 0.01;
                document.getElementById("limiteApostado").value = 1.01;
            }
        }
    }else{
        stopAnimation();
        clearInterval(intervalosMultiplicador);
    }
    /*
        Toggle hace la funcion de if:
        if botonIniciarPausar.classList tiene la clase play: se quita
        else: la añado
    */
    botonIniciarPausar.classList.toggle("pausa");
    //Si es un botón de play continua el juego
    //Si es un botón de pausa, para el juego
})

function retirarse(motivo){
    if(motivo === 0){
        recompensa = cantidadApostada * limiteApostado;
        recompensa = recompensa.toFixed(2);
    }
    contenedorMonedasUsuario.innerText = Math.round((parseFloat(contenedorMonedasUsuario.innerText) + parseFloat(recompensa)) * 100) / 100;
    alert("Se retira ganando: " + recompensa);
    agregarDinero()
    reiniciarJuego();
}

function reiniciarJuego(){
    if(botonIniciarPausar.classList.toggle("pausa")){
        botonIniciarPausar.classList.toggle("pausa");
    }
    document.getElementById("valorMultiplicador").innerText = 0;
    stopAnimation();
    clearInterval(intervalosMultiplicador);
    multiplicador = 0.95;
    inicio = 0;
    generarLimite();
}


function cambiarImagenes() {
    imagenKonguitoDino.src = `/static/images/konguito_run/Corriendo${numeroImagen}.png`;
    //Si por algun casual supera el 0 o el 6, vuelve al 1:
    if(numeroImagen <= 0 || numeroImagen >= 6){
        imagenKonguitoDino.src = `/static/images/konguito_run/Corriendo1.png`
    }
    //Límite de la serie, hay que decrementar
    if (numeroImagen === 5) {
        incremento = -1;
    } else if (numeroImagen === 1 && botonIniciarPausar.classList.contains("pausa")) {
        incremento = 1;
    }
    numeroImagen += incremento;
    //Comprobar que no ha superado el tiempo para hacer el retiro
    if(multiplicador >= limiteApostado && limiteApostado <= pararJuego){
        retirarse(0);
        reiniciarJuego();
    }
    if(multiplicador > pararJuego){
        alert("Se te pasó el tiempo, paró en el: " + pararJuego);
        reiniciarJuego();
    }
}

setInterval(cambiarImagenes, tiempoFrame);

function generarNumeroPararJuego() {
    /*
        El 2 es la media y el tres la desviación
     */
    let x = 2 + 3 * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
    
    if (x < 1) {
        x = 1;
    } else if (x > 20) {
        x = 20;
    }
    return x;
}

function generarLimite(){
    pararJuego = generarNumeroPararJuego().toFixed(2);
}

function retirarDinero() {
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + cantidadApostada);
}

function agregarDinero() {
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + recompensa);
}