let gameInterval = null;
let bala = null;
let apuesta = 0;
let recamara = 0; // Declaración de la variable recamara
const mensaje = document.querySelector('#mensajeDeInstrucciones');
let dineroUsuario = parseFloat(document.querySelector('#monedasUsuario').textContent);
let HaDisparado = 0;
console.log("Apostado: " + apuesta)

//Hazme una funcion que te de un tiempo y lo conviertas en un contador hasta 0

async function iniciarJuego() {
    bala = Math.floor(Math.random() * 6) + 1;
    // Obtiene el valor de apuesta justo antes de usarlo
    apuesta = parseFloat(document.querySelector('#bet').value);
    document.querySelector('#recuadroApuesta').style.display = "none";
    document.getElementById('iniciarJuego').style.display = 'none';
    console.log("apuesta: " + apuesta)
    actualizarDineroUsuario(-apuesta)
    retirarDinero()
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
    console.log("Recamara: " + recamara);
    console.log("Bala: " + bala);
    document.querySelector('#disparar').style.display = 'block';
    document.querySelector('#retirarse').style.display = 'block';
}

async function disparar() {
    HaDisparado = 1 + HaDisparado;
    //Ha disparado y esta en la primera recamara disparada
    if (HaDisparado === 1) {
        recamara = 1;
        console.log("Ha disparado: " + recamara)
        const elementoRecamara = document.getElementById(`recamara${recamara}`);
        if (elementoRecamara) {
            if (recamara === bala) {
                elementoRecamara.style.backgroundColor = "#d70c0c";
                mensaje.textContent = "Moriste puto pringado";
                document.querySelector('#disparar').style.display = 'none';
                document.querySelector('#retirarse').style.display = 'none';
                //Espera 2 segundos y reinicia el juego
                await new Promise(resolve => setTimeout(resolve, 2000));
                reiniciarJuego();
            } else {
                elementoRecamara.style.backgroundColor = "#47f403";
                mensaje.textContent = "Has sobrevivido. Te has cagado eh.";
            }
            recamara++;
        } else {
            console.error(`El elemento recamara${recamara} no existe.`);
        }
    } else {
        console.log("Ha disparado: " + recamara)
        const elementoRecamara = document.getElementById(`recamara${recamara}`);
        if (elementoRecamara) {
            if (recamara === 5 && recamara !== bala) {
                elementoRecamara.style.backgroundColor = "#47f403";
                mensaje.textContent = "Has ganada suertudo.";
                verficarResultado(recamara - 1);
            } else if (recamara === bala) {
                elementoRecamara.style.backgroundColor = "#d70c0c";
                mensaje.textContent = "Moriste puto pringado";
                document.querySelector('#disparar').style.display = 'none';
                document.querySelector('#retirarse').style.display = 'none';
                alert("Has perdido: " + apuesta + " KongoCoins");
                //Espera 2 segundos y reinicia el juego
                setTimeout(reiniciarJuego, 2000);
            } else {
                elementoRecamara.style.backgroundColor = "#47f403";
                mensaje.textContent = "Has sobrevivido. Te has cagado eh.";
            }
            recamara++;
        } else {
            console.error(`El elemento recamara${recamara} no existe.`);
        }
    }
}

function reiniciarJuego() {
    mensaje.textContent = "Presiona: Inciar Juego";
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`recamara${i}`).style.backgroundColor = "#64676e";
    }
    document.querySelector('#recuadroApuesta').style.display = "block";
    document.getElementById('iniciarJuego').style.display = 'block';
    clearInterval(gameInterval);
    console.log(recamara);
    recamara = 0;
    console.log(recamara);
    bala = null;
    console.log(HaDisparado); // Verifica el valor de HaDisparado
    HaDisparado = 0; // Asegúrate de restablecer HaDisparado
}

function retirarse() {
    mensaje.textContent = "Te has retirado cagón";
    document.querySelector('#disparar').style.display = 'none';
    document.querySelector('#retirarse').style.display = 'none';
    verficarResultado(recamara - 1)
    //Espera 2 segundos y reinicia el juego
    setTimeout(reiniciarJuego, 2000);
}

function verficarResultado(recamara) {
    if (recamara === 0) {
        console.log("retirado tras haber disparado: " + recamara)
        alert("Te has retirado perdiendo todo.");
        // No se realiza ninguna actualización aquí, ya que no hay ganancias
    } else if (recamara === 1) {
        console.log("retirado tras haber disparado: " + recamara)
        multiplicador = 0.2;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 2) {
        console.log("retirado tras haber disparado: " + recamara)
        multiplicador = 0.4;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 3) {
        console.log("retirado tras haber disparado: " + recamara)
        multiplicador = 1;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 4) {
        console.log("retirado tras haber disparado: " + recamara)
        multiplicador = 1.5;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 5) {
        console.log("retirado tras haber disparado: " + recamara)
        multiplicador = 2;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    }
}

function actualizarDineroUsuario(cantidad) {
    let dineroUsuarioElement = document.querySelector('#monedasUsuario');
    dineroUsuarioElement.textContent = parseFloat(dineroUsuarioElement.textContent) + cantidad;
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
    var monto = premio;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}


