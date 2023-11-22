let gameInterval = null;
let contadorInterval = null;
const mensaje = document.querySelector('#mensajeDeInstrucciones');
document.querySelector('#mensajeDeSeleccion').style.display = 'none';
document.querySelector('#recuadros-container').style.display = 'none';
let seleccionActual = null;
let bala;
let tiempo;

//Hazme una funcion que te de un tiempo y lo conviertas en un contador hasta 0
function contador(tiempo) {
    let contadorInterval = setInterval(() => {
        document.getElementById('contador').innerHTML = tiempo;
        if (tiempo > 0) {
            tiempo--;
        } else {
            clearInterval(contadorInterval);
        }
    }, 1000);
}

async function iniciarJuego() {
    // Oculta el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'none';
    const bala = Math.floor(Math.random() * 6) + 1;
    console.log("Bala: " + bala);

    // Inicia la animación de encender recámaras
    await EncenderRecamaras();

    if(tiempo===0) {
        await seleccionarDeRecamara();
        bloquearSeleccion();
        if(tiempo===0) {
            await disparos(6);
        }
    }
}


function bloquearSeleccion() {
    console.log("Bloqueando selección")
    mensaje.textContent = "Selección bloqueada.";
    mensaje.style.color = "#f00"; // Color rojo para indicar bloqueo
    document.querySelector('#recuadros-container').style.pointerEvents = 'none';
}

async function EncenderRecamaras() {
    contador(4)//Es 4 porque el contador tarda un segundo al parecer en inciar
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


    }, 5000 / 50);
    // Detener la animación después de 5 segundos
    await new Promise(resolve => setTimeout(resolve, 5000));
    //poner todas las recamras como antes:
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
    }
    clearInterval(gameInterval);
}

async function seleccionarDeRecamara(recamaraSeleccionada) {
    contador(10)
    mensaje.textContent = "Selecciona una recámara...";
    mensaje.style.color = "#f4a003";
    mensaje.style.backgroundColor = "#000";
    document.querySelector('#mensajeDeSeleccion').style.display = 'block';
    document.querySelector('#recuadros-container').style.display = 'flex';
    seleccionActual = recamaraSeleccionada;
    console.log("Has seleccionado: " + recamaraSeleccionada);
    for (let i = 1; i <= 6; i++) {
        document.querySelector(`.seleccion-recamara:nth-child(${i})`).style.backgroundColor = "#c4bd1e";
    }
    // Poner en color la recámara seleccionada
    document.querySelector(`.seleccion-recamara:nth-child(${recamaraSeleccionada})`).style.backgroundColor = "#1ec492";
}

async function disparos(numDisparos) {
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
    verficarResultado();
}

function verficarResultado() {
    if (seleccionActual == null) {
        console.log("no has seleccionado nada")
    } else if (bala === seleccionActual) {
        console.log("Has ganado")
    } else {
        console.log("Has perdido")
    }
}



