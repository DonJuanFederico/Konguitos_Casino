let gameInterval = null;
let contadorInterval = null;
const mensaje = document.querySelector('#mensajeDeInstrucciones');
// Poner una bala en cualquier recámara
const bala = Math.floor(Math.random() * 6) + 1;
document.querySelector('#mensajeDeSeleccion').style.display = 'none';
let seleccionActual = null;


function iniciarJuego() {
    // Oculta el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'none';
    // Inicia la animación de encender recámaras
    EncenderRecamaras(() => {
        // Después de que EncenderRecamaras haya terminado, inicia la selección de recámara
        seleccionarDeRecamara(() => {
            disparos(6);
        });
    });
}

function EncenderRecamaras(callback) {
    // CONTADOR:
    let tiempo = 9;
    contadorInterval = setInterval(() => {
        document.getElementById('contador').innerHTML = tiempo;
        if (tiempo > 0) {
            tiempo--;
        } else {
            clearInterval(contadorInterval);
        }
    }, 1000);

    let recamaraIluminada = 1;
    gameInterval = setInterval(() => {
        // Apaga todas las recámaras
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
        }

        // Enciende la recámara actual
        document.getElementById(`recamara${recamaraIluminada}`).style.backgroundColor = "#ff0000";

        // Actualiza el mensaje a "Moviendo bala..."
        mensaje.textContent = "Moviendo la bala...";

        // Avanza a la siguiente recámara aleatoriamente
        recamaraIluminada = Math.floor(Math.random() * 6) + 1;


    }, 10000 / 100);

    // Detener la animación después de 5 segundos
    setTimeout(() => {
        clearInterval(gameInterval);
        clearInterval(contadorInterval);
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
        }
        // Llamar al callback para continuar con la lógica después de EncenderRecamaras
        if (typeof callback === 'function') {
            callback();
        }
    }, 10000);
}

function seleccionarDeRecamara(recamaraSeleccionada) {
    console.log(recamaraSeleccionada);
    for (let i = 1; i <= 6; i++) {
        document.querySelector(`.seleccion-recamara:nth-child(${i})`).style.backgroundColor = "#c4bd1e";
    }
    // Poner en color amarillo la recámara seleccionada
    document.querySelector(`.seleccion-recamara:nth-child(${recamaraSeleccionada})`).style.backgroundColor = "#1ec492";
}


function disparos(numDisparos) {
    document.getElementById('contador').innerHTML = 0;
    mensaje.textContent = "Realizando disparos...";
    mensaje.style.color = "#000";
    mensaje.style.backgroundColor = "#fff";

    let tiempo = 10;
    contadorInterval = setInterval(() => {
        document.getElementById('contador').innerHTML = tiempo;
        if (tiempo > 0) {
            tiempo--;
        } else {
            clearInterval(contadorInterval);
        }
    }, 1000);

    // Función para disparar una recámara y avanzar al siguiente después de un retraso
    function dispararRecamara(recamara) {
        setTimeout(() => {
            // Marcar la recámara actual
            if (recamara === bala) {
                document.getElementById(`recamara${recamara}`).style.backgroundColor = "#a52a2a"; // Marrón
            } else {
                document.getElementById(`recamara${recamara}`).style.backgroundColor = "#000"; // Negro
            }

            // Mostrar el resultado después de los disparos
            if (recamara === numDisparos) {
                setTimeout(() => {
                    mostrarResultadoDisparos();
                }, 1000);
            }
        }, (recamara - 1) * (10000 / 6)); // Cada recámara se dispara cada 10/6 segundos
    }

    // Iniciar el disparo para cada recámara
    for (let recamara = 1; recamara <= numDisparos; recamara++) {
        dispararRecamara(recamara);
    }
}




