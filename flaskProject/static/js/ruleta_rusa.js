let selectedChamber = null;
let gameInterval = null;
let contadorInterval = null;
const mensaje = document.querySelector('#mensaje');
// Poner una bala en cualquier recámara
const bala = Math.floor(Math.random() * 6) + 1;

function iniciarJuego() {
    // Oculta el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'none';
    // Inicia la animación de encender recámaras
    EncenderRecamaras(() => {
        // Después de que EncenderRecamaras haya terminado, inicia la selección de recámara
        seleccionarRecamara();
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


//--------------------------------------------------------------
function pararJuego() {
    // Muestra el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'block';

    // Apaga todas las recámaras
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
    }

    // Habilita el botón de inicio
    document.getElementById('iniciarJuego').disabled = false;

    document.getElementById('contador').innerHTML = 10;
    clearInterval(contadorInterval);
    clearInterval(gameInterval);

    // Aquí puedes agregar cualquier otra lógica que necesites cuando el juego se detiene
}

//--------------------------------------------------------------
function seleccionarRecamara() {
    document.getElementById('contador').innerHTML = 0;
    // Actualiza el mensaje a "Seleccione una recámara
    mensaje.textContent = "Seleccione una recámara:";
    mensaje.style.color = "#FF0000";
    mensaje.style.backgroundColor = "#dbe138";
    // CONTADOR:
    let tiempo = 10;
    contadorInterval = setInterval(() => {
        document.getElementById('contador').innerHTML = tiempo;
        if (tiempo > 0) {
            tiempo--;
        } else {
            clearInterval(contadorInterval);
        }
    }, 1000);
    // Agrega listeners de click a las recámaras para la selección
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).addEventListener('click', () => evaluarSeleccion(i));
    }
}

function evaluarSeleccion(numero) {
    // Quitar listeners de click para evitar selecciones adicionales
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).removeEventListener('click', () => evaluarSeleccion(i));
    }
    let recamara = 1;
    let fin = false;

    while (fin === false) {
        // Verificar si la recámara seleccionada es la correcta
        if (recamara === bala && numero === recamara) {
            // Detener el juego si la recámara seleccionada es la correcta
            mensaje.textContent = "Has ganado." + "\n" + "La bala estaba: " + bala;
            fin = true;
            pararJuego();
        } else if (recamara === bala && numero !== recamara) {
            // Detener el juego si la recámara seleccionada es la correcta
            mensaje.textContent = "Has perdido." + "\n" + "La bala estaba: " + bala;
            fin = true;
            pararJuego();
        } else {
            //Poner una x en la recamara
            document.getElementById(`recamara${numero}`).innerHTML = "X";
            // Avanza a la siguiente recámara
            recamara = recamara % 6 + 1;
        }
    }
    clearInterval(contadorInterval);
}

// Agrega los listeners de click a las recámaras inicialmente
for (let i = 1; i <= 6; i++) {
    document.getElementById(`recamara${i}`).addEventListener('click', () => evaluarSeleccion(i));
}



