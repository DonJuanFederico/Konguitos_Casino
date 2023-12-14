let gameInterval = null;
let bala = null;
let apuesta = 0;
let recamara = 0; // Declaración de la variable recamara
const mensaje = document.querySelector('#mensajeDeInstrucciones');
let saldo = parseFloat(document.querySelector('#monedasUsuario').textContent);
let HaDisparado = 0;


async function iniciarJuego() {
    // Obtiene el valor de apuesta justo antes de usarlo
    apuesta = parseFloat(document.querySelector('#bet').value);
    // Comprueba que la apuesta es válida
    if (apuesta >= 1 && apuesta <= saldo) {
        bala = Math.floor(Math.random() * 6) + 1;
        document.querySelector('#recuadroApuesta').style.display = "none";
        document.getElementById('iniciarJuego').style.display = 'none';
        console.log("apuesta: " + apuesta)
        actualizarDineroUsuario(-apuesta)
        retirarDinero()
        // Inicia la animación de encender recámaras
        await EncenderRecamaras();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'La apuesta no es válida',
            text: 'Debe ser un NÚMERO positivo y menor que el saldo.',
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
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
                mensaje.textContent = "Has muerto";
                document.querySelector('#disparar').style.display = 'none';
                document.querySelector('#retirarse').style.display = 'none';
                //Espera 2 segundos y reinicia el juego
                await new Promise(resolve => setTimeout(resolve, 2000));
                reiniciarJuego();
            } else {
                elementoRecamara.style.backgroundColor = "#47f403";
                mensaje.textContent = "Has sobrevivido.";
            }
            recamara++;
        } else {
            console.error(`El elemento recamara${recamara} no existe.`);
        }
    } else {
        const elementoRecamara = document.getElementById(`recamara${recamara}`);
        if (elementoRecamara) {
            if (recamara === bala) {
                elementoRecamara.style.backgroundColor = "#d70c0c";
                mensaje.textContent = "Has muerto";
                document.querySelector('#disparar').style.display = 'none';
                document.querySelector('#retirarse').style.display = 'none';
                Swal.fire({
                    text: 'Has perdido: ' + apuesta + " KongoCoins",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                //Espera 2 segundos y reinicia el juego
                setTimeout(reiniciarJuego, 2000);
            } else {
                elementoRecamara.style.backgroundColor = "#47f403";
                mensaje.textContent = "Sigues vivo";
            }
            recamara++;
        } else {
            console.error(`El elemento recamara${recamara} no existe.`);
        }
    }
    //espera 1 segundo para que se pueda disparar otra vez
    await new Promise(resolve => setTimeout(resolve, 500));
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
    mensaje.textContent = "Te has retirado";
    document.querySelector('#disparar').style.display = 'none';
    document.querySelector('#retirarse').style.display = 'none';
    verficarResultado(recamara - 1)
    //Espera 2 segundos y reinicia el juego
    setTimeout(reiniciarJuego, 2000);
}

function verficarResultado(recamara) {
    if (recamara === 0) {
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Te has retirado perdiendo todo.",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        // No se realiza ninguna actualización aquí, ya que no hay ganancias
    } else if (recamara === 1) {
        multiplicador = 0.2;
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Has ganado: " + apuesta * multiplicador + " KongoCoins",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 2) {
        multiplicador = 0.4;
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Has ganado: " + apuesta * multiplicador + " KongoCoins",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 3) {
        multiplicador = 1;
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Has ganado: " + apuesta * multiplicador + " KongoCoins",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 4) {
        multiplicador = 1.5;
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Has ganado: " + apuesta * multiplicador + " KongoCoins",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        agregarDinero()
    } else if (recamara === 5) {
        multiplicador = 2;
        actualizarDineroUsuario(apuesta * multiplicador);
        premio = apuesta * multiplicador;
        Swal.fire({
            title: 'RECOMPENSAS',
            text: "Has ganado: " + apuesta * multiplicador + " KongoCoins",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
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
    xhr.open("POST", "/agregar_ganancias", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;

function volverAtras() {
    if (prevUrl.indexOf(window.location.host) !== -1) {
        // Ir a la página anterior
        window.history.back();
    }
}
