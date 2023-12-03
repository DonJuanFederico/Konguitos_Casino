let gameInterval = null;
let bala = null;
let apuesta = 0;
let recamara = 0; // Declaración de la variable recamara
const mensaje = document.querySelector('#mensajeDeInstrucciones');
let dineroUsuario = parseFloat(document.querySelector('#monedasUsuario').textContent);
let HaDisparado = 0;
console.log("Apostado: " + apuesta)



async function iniciarJuego() {
    // Obtiene el valor de apuesta justo antes de usarlo
    apuesta = parseFloat(document.querySelector('#bet').value);
    // Comprueba que la apuesta es válida
    if (apuesta > 1 && apuesta <= saldo) {
        bala = Math.floor(Math.random() * 6) + 1;
        document.querySelector('#recuadroApuesta').style.display = "none";
        document.getElementById('iniciarJuego').style.display = 'none';
        console.log("apuesta: " + apuesta)
        actualizarDineroUsuario(-apuesta)
        retirarDinero()
        // Inicia la animación de encender recámaras
        await EncenderRecamaras();
    } else {
        // Muestra un mensaje de error al usuario
        alert("La apuesta no es válida. Debe ser un NUMERO mayor que 1 y menor o igual que el saldo. ");
    }
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
    document.querySelector('#disparar').style.display = 'block';
    document.querySelector('#retirarse').style.display = 'block';
}

async function disparar() {
    HaDisparado = 1 + HaDisparado;
    //Ha disparado y esta en la primera recamara disparada
    if (HaDisparado === 1) {
        recamara = 1;
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
    recamara = 0;
    bala = null;
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
        alert("Te has retirado perdiendo todo.");
        // No se realiza ninguna actualización aquí, ya que no hay ganancias
    } else if (recamara === 1) {
        multiplicador = 0.2;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 2) {
        multiplicador = 0.4;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 3) {
        multiplicador = 1;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 4) {
        multiplicador = 1.5;
        alert("Has ganado: " + apuesta * multiplicador + " KongoCoins");
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 5) {
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


