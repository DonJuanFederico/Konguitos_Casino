let selectedChamber = null;
let gameInterval = null;
function iniciarJuego() {
    // Oculta el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'none';

    //Animacion de encender recamaras:
    EncenderRecamaras();
    // Después de 20 segundos, detén el juego automáticamente
    setTimeout(pararJuego, 10000);
}

function reiniciarJuegos() {
    // Reincia el contador
    let tiempo = 10;
    document.getElementById('contador').innerHTML = tiempo;
}

function EncenderRecamaras() {
    //Iniciamos el contador:
    contador();
    let recamaraIluminada = 1;
    let rondas = 0;
    gameInterval = setInterval(() => {
        // Apaga todas las recámaras
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`recamara${i}`).style.backgroundColor = "#000000";
        }

        // Enciende la recámara actual
        document.getElementById(`recamara${recamaraIluminada}`).style.backgroundColor = "#ff0000";

        // Avanza a la siguiente recámara
        recamaraIluminada = recamaraIluminada % 6 + 1;

        // Incrementa el contador de rondas cada vez que se completa una ronda
        if (recamaraIluminada === 1) {
            rondas++;
        }

        // Detén el intervalo después de tres rondas
        if (rondas === 3) {
            clearInterval(gameInterval);
            for (let i = 1; i <= 6; i++) {
                document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
            }
        }
    }, 3000 / 18);  // 3 rondas de 6 recámaras en 3 segundos
}

function contador() {
    let tiempo = 10;
    let intervalo = setInterval(() => {
        tiempo--;
        document.getElementById('contador').innerHTML = tiempo;
        if (tiempo === 0) {
            clearInterval(intervalo);
        }
    }, 999);
}

function pararJuego() {
    // Muestra el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'block';
    // Apaga todas las recámaras
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
    }
    // Habilita el botón de inicio
    document.getElementById('iniciarJuego').disabled = false;
    //Poner el contador en 10:
    reiniciarJuegos();

    // Aquí puedes agregar cualquier otra lógica que necesites cuando el juego se detiene
}

function seleccionarRecamara(numero) {
    // Si ya se seleccionó una recámara, deselecciónala
    if (selectedChamber !== null) {
        document.getElementById(`recamara${selectedChamber}`).style.backgroundColor = '#000000';
    }

    // Selecciona la nueva recámara
    selectedChamber = numero;
    document.getElementById(`recamara${selectedChamber}`).style.backgroundColor = '#c4bd1e';
}

// Agrega los listeners de click a las recámaras
for (let i = 1; i <= 6; i++) {
    document.getElementById(`recamara${i}`).addEventListener('click', () => seleccionarRecamara(i));
}

