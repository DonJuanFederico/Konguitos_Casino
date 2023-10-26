const konguitoDino = document.getElementById("konguitoDino");
const fondoDinamico = document.getElementById("fondoDinamico");
const contenedorJuego = document.getElementById("contenedorJuego");
const botonIniciarPausar = document.getElementById("botonIniciarPausar");
const botonRetirarApuesta = document.getElementById("botonRetirarApuesta");

let scoreInterval;
let dinoAnimation;
let incremento = 0;
let score = 0.95;
let imagen;
let cantidadApostada;
let limiteApostado;
let recompensa = 1;
let inicio = 0;
let tiempoFrame;
let numeroImagen;
let pararJuego;
let volverPrincipal = document.getElementById("imagenKonguitosCasino");
let botonComprarMonedas = document.getElementById("botonComprarMonedas");

//Nada mas cargar la página se ejecuta esta función
stopAnimation();

function stopAnimation(){
    fondoDinamico.style.animationPlayState = "paused";
    konguitoDino.style.animationPlayState = "paused";
    mantenerImagen();
}
contenedorJuego.addEventListener("click", function(){
    annadirDesplazamientoKonguitoDino();
});

function annadirDesplazamientoKonguitoDino(){
    konguitoDino.classList.add("desplazamientoKonguitoDino");
}

konguitoDino.addEventListener("animationend", () =>{
    eliminarDesplazamientoKonguitoDino();
});

function eliminarDesplazamientoKonguitoDino(){
    konguitoDino.classList.remove("desplazamientoKonguitoDino");
}

function resumeGame(){
    reanudarAnimation();
    reanudarMarcador();

}

function reanudarAnimation(){
    fondoDinamico.style.animationPlayState = "running";
    konguitoDino.style.animationPlayState = "running";
    reanudarImagen();
}

function reanudarMarcador(){
    scoreInterval = setInterval(() => {
        if(getComputedStyle(konguitoDino).animationPlayState === "running"){
            score = score + 0.01;
            recompensa = cantidadApostada * score;
        }
        document.getElementById("valorMultiplicador").innerText = score.toFixed(2);
        recompensa = Math.floor(recompensa * 100) / 100; // Trunca a dos decimales. No los aproxima
        document.getElementById("recompensa").innerText = recompensa.toFixed(2);
    }, 50);
}

function reanudarImagen(){
    incremento = 1;
}

function mantenerImagen(){
    incremento = 0;
}

function stopScore(){
    clearInterval(scoreInterval);
}

function stopDinoAnimation(){
    clearInterval(dinoAnimation);
}

function pauseGame(){
    stopAnimation();
    stopScore();
}

botonIniciarPausar.addEventListener("click", () => {
    if(!botonIniciarPausar.classList.contains("pausa")){
        posibleCantidad = parseFloat(document.getElementById("cantidadApostada").value);
        if(posibleCantidad >= (0.01) && document.getElementById("limiteApostado").value >= 1.01){
            if(inicio > 0) {
                resumeGame();
            }else if(posibleCantidad - parseFloat(posibleCantidad.toFixed(2)) == 0){
                if(parseFloat(document.getElementById("cantidadApostada").value) <= parseFloat(document.getElementById("monedasUsuario").innerText)) {
                    //Primera vez que le da al play en la partida
                    if (inicio === 0) {
                        cantidadApostada = parseFloat(document.getElementById("cantidadApostada").value);
                        limiteApostado = parseFloat(document.getElementById("limiteApostado").value);
                        inicio++;
                        //Quitar el dinero de la cuenta y mostrarlo en el marcado:
                        retirarDinero();
                        contenedorMonedasUsuario = document.getElementById("monedasUsuario");
                        contenedorMonedasUsuario.innerText = Math.round((parseFloat(contenedorMonedasUsuario.innerText) - cantidadApostada) * 100)/ 100;
                    }
                    //Reanudar el juego.
                    resumeGame();
                }else {
                    botonIniciarPausar.classList.toggle("pausa");
                    alert("Cantidad insuficiente");
                }
            }else{
                //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
                botonIniciarPausar.classList.toggle("pausa");
                alert("Dos decimales solo");
                document.getElementById("cantidadApostada").value = 0.01;
                document.getElementById("limiteApostado").value = 1.01;
            }
        }else{
            //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
            botonIniciarPausar.classList.toggle("pausa");
            alert("NADA DE APUESTAS NEGATIVAS Y LÍMITES SIN SENTIDO. ¡JUEGA LIMPIO!");
            document.getElementById("cantidadApostada").value = 0.01;
            document.getElementById("limiteApostado").value = 1.01;
        }
    }else{
        pauseGame();
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



botonRetirarApuesta.addEventListener("click", solicitarRetirarse);

function solicitarRetirarse(){
    if(inicio === 1){
        retirarse(1);
    }
}

function retirarse(motivo){
    if(motivo === 0){
        recompensa = cantidadApostada * limiteApostado;
        recompensa = recompensa.toFixed(2);
    }
    contenedorMonedasUsuario.innerText = Math.round((parseFloat(contenedorMonedasUsuario.innerText) + parseFloat(recompensa)) * 100) / 100;
    alert("Se retira ganando: " + recompensa);
    agregarDinero()
    restartGame();
}

function restartGame(){
    if(botonIniciarPausar.classList.toggle("pausa")){
        botonIniciarPausar.classList.toggle("pausa");
    }
    document.getElementById("valorMultiplicador").innerText = 0;
    pauseGame();
    score = 0.95;
    inicio = 0;
    generarLimite();
}




imagen = document.getElementById('imagenKonguitoDino');
numeroImagen = 1;
incremento = 0;
tiempoFrame = 90; // Cambiado a 90 para una animación más rápida

function cambiarImagenes() {
    imagen.src = `/static/images/konguito_run/Corriendo${numeroImagen}.png`;
    //Se buguea y a veces no sale la imagen konguitoDino ARREGLAR, solución temporal:
    if(numeroImagen <= 0 || numeroImagen >= 6){
        imagen.src = `/static/images/konguito_run/Corriendo1.png`
    }
    if (numeroImagen === 5) {
        incremento = -1;
    } else if (numeroImagen === 1 && botonIniciarPausar.classList.contains("pausa")) {
        incremento = 1;
    }
    numeroImagen += incremento;
    if(score >= limiteApostado && limiteApostado <= pararJuego){
        retirarse(0);
        restartGame();
    }
    if(score > pararJuego){
        alert("Se te pasó el tiempo, paró en el: " + pararJuego);
        restartGame();
    }
}

setInterval(cambiarImagenes, tiempoFrame);

function generarNumeroNormal(media, desviacion) {
    let u1 = Math.random();
    let u2 = Math.random();
    
    let z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    
    let x = media + desviacion * z;
    
    if (x < 1) {
        x = 1;
    } else if (x > 20) {
        x = 20;
    }
    return x;
}



function generarLimite(){
    pararJuego = generarNumeroNormal(2, 3).toFixed(2);
}

volverPrincipal.addEventListener("click", function() {
    window.location.href = "/Juegos";
});

botonComprarMonedas.addEventListener("click", function() {
    window.location.href = "/dinero/";
});

document.addEventListener("DOMContentLoaded", () => generarLimite());

function retirarDinero() {
    var monto = cantidadApostada;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function agregarDinero() {
    var monto = recompensa;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}