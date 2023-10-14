const player = document.getElementById("player");
const fondo = document.getElementById("fondo");

let scoreInterval;
let dinoAnimation;
let incremento = 0;
/*
    Cuando haces click en el documento:document.addEventListener("click", function()
*/
const board = document.getElementById("board");
board.addEventListener("click", function(){
    addClassJump();
});

player.addEventListener("animationend", () =>{
    removeClassJump();
});

let score = 0.95;

function addClassJump(){
    player.classList.add("playerJump");
}

function removeClassJump(){
    player.classList.remove("playerJump");
}

stopAnimation();

function stopAnimation(){
    fondo.style.animationPlayState = "paused";
    player.style.animationPlayState = "paused";
    mantenerImagen();
}

function resumeAnimation(){
    fondo.style.animationPlayState = "running";
    player.style.animationPlayState = "running";
    reanudarImagen();
}

function resumeGame(){
    resumeAnimation();
    resumeScore();

}

function reanudarImagen(){
    incremento = 1;
}

function mantenerImagen(){
    incremento = 0;
}

let imagen;
let cantidadApostada;
let limiteApostado;
let recompensa = 1;


function resumeScore(){
    scoreInterval = setInterval(() => {
        if(getComputedStyle(player).animationPlayState === "running"){
            score = score + 0.01;
            recompensa = cantidadApostada * score;
        }
        document.getElementById("score").innerText = score.toFixed(2);
        recompensa = Math.floor(recompensa * 100) / 100; // Trunca a dos decimales. No los aproxima
        document.getElementById("recompensa").innerText = recompensa.toFixed(2);
    }, 50);
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

const buttonPlayStop = document.getElementById("buttonPlayStop");

let inicio = 0;

buttonPlayStop.addEventListener("click", () => {
    if(!buttonPlayStop.classList.contains("pausa")){
        posibleCantidad = parseFloat(document.getElementById("cantidadApostada").value);
        if(posibleCantidad >= (0.01) && document.getElementById("limiteApostado").value >= 1.01){
            if(inicio > 0) {
                resumeGame();
            }else if(posibleCantidad - parseFloat(posibleCantidad.toFixed(2)) == 0){
                if(parseFloat(document.getElementById("cantidadApostada").value) <= parseFloat(document.getElementById("monedas").innerText)) {
                    //Primera vez que le da al play en la partida
                    if (inicio === 0) {
                        cantidadApostada = parseFloat(document.getElementById("cantidadApostada").value);
                        limiteApostado = parseFloat(document.getElementById("limiteApostado").value);
                        inicio++;
                        //Quitar el dinero de la cuenta y mostrarlo en el marcado:
                        retirarDinero();
                        marcador = document.getElementById("monedas");
                        marcador.innerText = Math.round((parseFloat(marcador.innerText) - cantidadApostada) * 100)/ 100;
                    }
                    //Reanudar el juego.
                    resumeGame();
                }else {
                    buttonPlayStop.classList.toggle("pausa");
                    alert("Cantidad insuficiente");
                }
            }else{
                //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
                buttonPlayStop.classList.toggle("pausa");
                alert("Dos decimales solo");
                document.getElementById("cantidadApostada").value = 0.01;
                document.getElementById("limiteApostado").value = 1.01;
            }
        }else{
            //Mantenga el botón de play, y no se ponga el de pausa aunque no se inicie el juego
            buttonPlayStop.classList.toggle("pausa");
            alert("NADA DE APUESTAS NEGATIVAS Y LÍMITES SIN SENTIDO. ¡JUEGA LIMPIO!");
            document.getElementById("cantidadApostada").value = 0.01;
            document.getElementById("limiteApostado").value = 1.01;
        }
    }else{
        pauseGame();
    }
    /*
        Toggle hace la funcion de if:
        if buttonPlayStop.classList tiene la clase play: se quita
        else: la añado
    */
    buttonPlayStop.classList.toggle("pausa");
    //Si es un botón de play continua el juego
    //Si es un botón de pausa, para el juego
})

const restartButton = document.getElementById("restartGame");

restartButton.addEventListener("click", solicitarRetirarse);

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
    marcador.innerText = Math.round((parseFloat(marcador.innerText) + parseFloat(recompensa)) * 100) / 100;
    alert("Se retira ganando: " + recompensa);
    agregarDinero()
    restartGame();
}

function restartGame(){
    if(buttonPlayStop.classList.toggle("pausa")){
        buttonPlayStop.classList.toggle("pausa");
    }
    document.getElementById("score").innerText = 0;
    pauseGame();
    score = 0.95;
    inicio = 0;
    generarLimite();
}

let tiempoFrame;
let numeroImagen;


imagen = document.getElementById('konguitoDino');
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
    } else if (numeroImagen === 1 && buttonPlayStop.classList.contains("pausa")) {
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

let boton = document.getElementById("boton");

/*const ModalWindow = {
    init() {
        document.body.addEventListener("click", e => {
            if (e.target.classList.contains("modal__close")) {
                this.closeModal(e.target);
            }
        });
      
      this.openModal();
    },

    getHtmlTemplate(modalOptions) {
        return `
            <div class="modal__overlay">
                <div class="modal__window">
                    <div class="modal__titlebar">
                        <span class="modal__title">${modalOptions.title}</span>
                        <button class="modal__close material-icons">close</button>
                    </div>
                    <div class="modal__content">
                        ${modalOptions.content}
                    </div>
                </div>
            </div>
        `;
    },

    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Atención',
            content: 'Rellene los campos para jugar'
        }, modalOptions);

        const modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },

    closeModal(closeButton) {
        const modalOverlay = closeButton.parentElement.parentElement.parentElement;
        document.body.removeChild(modalOverlay);
    }
};*/

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

let pararJuego;

function generarLimite(){
    pararJuego = generarNumeroNormal(2, 3).toFixed(2);
}

let volverPrincipal = document.getElementById("konguitos");

volverPrincipal.addEventListener("click", function() {
    window.location.href = "/Juegos";
});

let masMonedas = document.getElementById("masMonedas");

masMonedas.addEventListener("click", function() {
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