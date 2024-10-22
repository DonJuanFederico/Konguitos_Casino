var board = document.getElementById("board");
var pegs = document.querySelectorAll(".peg");
var audio = new Audio('/static/audio/uf.mp3');
var botonComienzo = document.getElementById("botonComienzo");
var sonicCorriendo = document.getElementById("sonicCorriendo");

var musica = document.getElementById("musica");
musica.play();
desplazarSonic();

let saldo = document.getElementById('monedas').textContent;
let apuesta;

var semaforo = false;

var aceleracionInicial = 0.1;
var factorRebote = 0.6;
var ignorarColisiones = false;
var idAnimacion;

var multiplicadores = [0, 12, 1, 0.5, 0, 0.5, 1, 12, 0];

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var masMonedasImagen = document.getElementById('masMonedas');

var valor = 0;

var bola = document.getElementById("ball");

var score = 0;
var contador = 0;
var paso = false;


function mostrarGanado() {
    for (var i = 0; i < multiplicadores.length; i++) {
        var span = document.getElementById("multi-" + (i + 1));
        span.textContent = "x" + multiplicadores[i];
    }
}



function mostrarModal() {
    modal.style.display = "block";
    setTimeout(function () {
        modal.querySelector('.modal-content').classList.add('show');
    }, 10);
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

mostrarGanado();

function desplazarSonic() {

    sonicCorriendo.style.opacity = 1;
    // Cambia la posición de Sonic a la derecha de la pantalla
    sonicCorriendo.style.left = "100%";


    // Imprime un mensaje en la consola
    console.log("Sonic se está moviendo...");

    // Vuelve a la posición inicial después de un retraso
    setTimeout(function () {
        sonicCorriendo.style.opacity = 0;
        sonicCorriendo.style.left = "-100%";

    }, Math.floor(Math.random() * 8000)); // Ajusta el tiempo de espera según tus necesidades
}

// Llama a la función cada 5 segundos
setInterval(desplazarSonic, Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000 ); // 5 segundos



function reiniciarBola() {
    semaforo = true;
    if (idAnimacion) {
        cancelAnimationFrame(idAnimacion);
    }

    var factorNuevaPosicion = Math.random() * (0.02 - 0.005) + 0.005;
    bola.style.left = (board.clientWidth / 2 - bola.clientWidth / 2) + (factorNuevaPosicion * board.clientWidth / 2) + "px";
    bola.style.top = 0;
    bola.velocidadX = 0;
    bola.velocidadY = 0;
    bola.aceleracion = aceleracionInicial;

    idAnimacion = requestAnimationFrame(function () {
        actualizarPosicionBola();
    });

    mostrarContador();
}

function agregarDinero() {
    var monto = apuesta * score;
    saldo = saldo + monto;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_ganancias", true);  //Esto es para agregar en ganancias
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
    document.getElementById('monedas').textContent = saldo + monto;
    console.log("Esta pasando" + monto);
}

function retirarDinero() {
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function actualizarPosicionBola() {
    if (apuesta > 0) {
        if (apuesta > 0) {
            if (bola.offsetTop + bola.clientHeight >= board.clientHeight * 0.59) {
                if (semaforo == true) {
                    agregarDinero();
                    document.getElementById('guardar').style.display = 'block';
                }
                bola.velocidadX = 0;
                bola.velocidadY = 0;
                bola.aceleracion = 0;
                semaforo = false;
            } else {
                bola.velocidadY += bola.aceleracion;
            }

            var posYActual = parseFloat(bola.style.top) || 0;
            var nuevaPosY = posYActual + bola.velocidadY;
            var posXActual = parseFloat(bola.style.left) || 0;
            var nuevaPosX = posXActual + bola.velocidadX;

            bola.style.top = nuevaPosY + "px";
            bola.style.left = nuevaPosX + "px";

            for (var i = 0; i < pegs.length; i++) {
                var peg = pegs[i];
                var centroXPeg = peg.offsetLeft + peg.clientWidth / 2;
                var centroYPeg = peg.offsetTop + peg.clientHeight / 2;
                var centroXBola = bola.offsetLeft + bola.clientWidth / 2;
                var centroYBola = bola.offsetTop + bola.clientHeight / 2;

                var dx = centroXBola - centroXPeg;
                var dy = centroYBola - centroYPeg;
                var distancia = Math.sqrt(dx * dx + dy * dy);

                if (!ignorarColisiones && distancia <= peg.clientWidth / 2 + bola.clientWidth / 2) {
                    var normalX = dx / distancia;
                    var normalY = dy / distancia;

                    var productoPunto = bola.velocidadX * normalX + bola.velocidadY * normalY;
                    var tangenteX = bola.velocidadX - productoPunto * normalX;
                    var tangenteY = bola.velocidadY - productoPunto * normalY;

                    bola.velocidadX = tangenteX - factorRebote * normalX * productoPunto;
                    bola.velocidadY = tangenteY - factorRebote * normalY * productoPunto;

                    var superposicion = (peg.clientWidth / 2 + bola.clientWidth / 2) - distancia;
                    bola.style.top = (bola.offsetTop + superposicion * normalY) + "px";
                    bola.style.left = (bola.offsetLeft + superposicion * normalX) + "px";

                    audio.play();

                    ignorarColisiones = true;
                    setTimeout(function () {
                        ignorarColisiones = false;
                    }, 1);
                }
            }

            if (posXActual >= 0 && posXActual < board.clientWidth * 0.325) {
                actualizarScore(0);
            } else if (posXActual >= board.clientWidth * 0.325 && posXActual < board.clientWidth * 0.375) {
                actualizarScore(12);
            } else if (posXActual >= board.clientWidth * 0.375 && posXActual < board.clientWidth * 0.425) {
                actualizarScore(1);
            } else if (posXActual >= board.clientWidth * 0.425 && posXActual < board.clientWidth * 0.475) {
                actualizarScore(0.5);
            } else if (posXActual >= board.clientWidth * 0.475 && posXActual < board.clientWidth * 0.525) {
                actualizarScore(0);
            } else if (posXActual >= board.clientWidth * 0.525 && posXActual < board.clientWidth * 0.575) {
                actualizarScore(0.5);
            } else if (posXActual >= board.clientWidth * 0.575 && posXActual < board.clientWidth * 0.625) {
                actualizarScore(1);
            } else if (posXActual >= board.clientWidth * 0.625 && posXActual < board.clientWidth * 0.675) {
                actualizarScore(12);
            } else if (posXActual >= board.clientWidth * 0.675 && posXActual <= board.clientWidth) {
                actualizarScore(0);
            }

            if (posYActual >= board.clientHeight * 0.585) {
                paso = true;
            } else {
                if (paso) {
                    contador++;
                    paso = false;
                }
            }

            idAnimacion = requestAnimationFrame(function () {
                actualizarPosicionBola();
            });
        }
    }
}

function actualizarScore(numero) {
    score = numero;
    document.getElementById("score").textContent = score;
}

function mostrarScore(valor) {
    var score = document.getElementById("score");
    if (valor) {
        score.style.display = "flex";
    } else {
        score.style.display = "none";
    }
}

function mostrarContador() {
    console.log("La bola ha pasado el top: 58.5% " + contador + " veces.");
}

document.getElementById("guardar").addEventListener("click", function () {

    valor = document.getElementById("numero").value;
    if (!isNaN(valor) && valor > 0 && saldo - valor >= 0) {
    saldo = saldo - valor;
    apuesta = valor;
    console.log("Se ha guardado el número " + apuesta);

    // Solo ejecutar reiniciarBola() si el valor es mayor que 0
    if (valor > 0) {
        reiniciarBola();
    }

    retirarDinero();
    document.getElementById('guardar').style.display = 'none';
    document.getElementById('monedas').textContent = saldo;
} else {
    mostrarModal();
}

    setTimeout(function () {
        ignorarColisiones = false;
    }, 1);
});

document.getElementById("monedas").addEventListener("click", function () {
    window.location.href = "/dinero/";
});
masMonedasImagen.addEventListener('click', function () {
    window.location.href = "/dinero/";
});



