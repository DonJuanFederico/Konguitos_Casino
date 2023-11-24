let gameInterval = null;
let contadorInterval = null;
const mensaje = document.querySelector('#mensajeDeInstrucciones');
document.querySelector('#mensajeDeSeleccion').style.display = 'none';
document.querySelector('#recuadros-container').style.display = 'none';
let seleccionActual = null;
let bala = null;
apuesta = parseInt(document.querySelector('#bet').value);
console.log(apuesta)
dineroUsuario = parseFloat(document.querySelector('#monedasUsuario').textContent);
console.log(dineroUsuario)


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
    document.querySelector('#recuadroApuesta').style.display = "none";
    // Oculta el botón de inicio
    document.getElementById('iniciarJuego').style.display = 'none';
    bala = Math.floor(Math.random() * 6) + 1;
    console.log("Bala: " + bala);

    // Inicia la animación de encender recámaras
    await EncenderRecamaras();
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
    contador(10)
    await seleccionarRecamara()
}

async function seleccionarRecamara(recamaraSeleccionada) {
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
    // Esperar a que se seleccione una recámara
    await new Promise(resolve => setTimeout(resolve, 10000));
    // Bloquear la selección
    bloquearSeleccion();
    await Animaciondisparos(6, recamaraSeleccionada);
}


async function Animaciondisparos(numDisparos, recamaraSeleccionada) {
    document.getElementById('contador').innerHTML = 0;
    mensaje.textContent = "Realizando disparos...";
    mensaje.style.color = "#000";
    mensaje.style.backgroundColor = "#fff";

    // Función para disparar una recámara y avanzar al siguiente después de un retraso
    function dispararRecamara(recamara) {
        console.log("disparar " + bala)
        setTimeout(() => {
            // Marcar la recámara actual
            if (recamara === bala) {
                document.getElementById(`recamara${recamara}`).style.backgroundColor = "#d70c0c"; // Marrón
            } else {
                document.getElementById(`recamara${recamara}`).style.backgroundColor = "#000"; // Negro
            }

            // Mostrar el resultado después de los disparos
            if (recamara === numDisparos) {
                setTimeout(() => {
                    verficarResultado(recamaraSeleccionada);
                }, 1000);
            }
        }, (recamara - 1) * (10000 / 6)); // Cada recámara se dispara cada 10/6 segundos
    }

    // Iniciar el disparo para cada recámara
    for (let recamara = 1; recamara <= numDisparos; recamara++) {
        dispararRecamara(recamara);
    }
}

function verficarResultado(recamaraSeleccionada) {
    if (recamaraSeleccionada == null) {
        console.log("no has seleccionado nada");
        mensaje.textContent = "No has seleccionado nada";
    } else if (bala === recamaraSeleccionada) {
        console.log("Has ganado");
        mensaje.textContent = "Has ganado";
        console.log(dineroUsuario)
        console.log(apuesta)
        dineroUsuario += apuesta;
        agregarDinero(); // Agrega el monto de la apuesta a la cuenta
    } else {
        console.log("Has perdido");
        mensaje.textContent = "Has perdido";
        console.log(dineroUsuario)
        console.log(apuesta)
        dineroUsuario -= apuesta;
        retirarDinero(); // Retira el monto de la apuesta de la cuenta
    }
}

//Funciones de Añadir y retirar dinero:
//Te redirige a la pagina de comprar monedas
document.getElementById("botonComprarMonedas").addEventListener("click", function () {
    window.location.href = "/dinero/";
});

function retirarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LA APUESTA
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function agregarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LO GANADO (MIRAR TRAGAPERRAS PARA VERLO BIEN)
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}


