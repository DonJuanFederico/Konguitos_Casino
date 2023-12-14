var dinero = parseFloat(document.querySelector('#monedasUsuario').textContent);
console.log('Dinero del usuario:', dinero);
var PIRATA = document.querySelector('#pirata').textContent;
console.log('Pirata: ', PIRATA);
var ASTRONAUTA = document.querySelector('#astronauta').textContent;
console.log('Astronauta: ', ASTRONAUTA);
var REY = document.querySelector('#rey').textContent;
console.log('Rey: ', REY);
var CAPITAN = document.querySelector('#capitan').textContent;
console.log('Capitan: ', CAPITAN);
var TIGRE = document.querySelector('#tigre').textContent;
console.log('Tigre: ', TIGRE);
var VIKINGO = document.querySelector('#vikingo').textContent;
console.log('Vikingo: ', VIKINGO);
var id_usuario = document.querySelector('#id').textContent;
console.log('Id usuario: ', id_usuario);

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

function activarColumnaGashapon(id_usuario, columna) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update_columna_gashapon", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        if (xhr.status === 200) {
            // La solicitud fue exitosa, puedes manejar la respuesta aquí
            console.log(xhr.responseText);
        } else {
            // Hubo un error en la solicitud
            console.error("Error en la solicitud: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        // Hubo un error de red
        console.error("Error de red al realizar la solicitud");
    };

    xhr.send("&id_usuario=" + id_usuario + "&columna=" + columna);
}

function girar() {
    if (dinero < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "No tienes suficiente dinero para jugar.",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    } else {
        // Hide the ruedecilla element
        document.querySelector('#ruedecilla').style.display = "none";
        apuesta = 10;
        actualizarDineroUsuario(-apuesta)
        retirarDinero()
        var imagenElement = document.getElementById("GachaponWey");
        var imageSources = [
            "/static/images/gashapon/1Gachapon.png",
            "/static/images/gashapon/2Gachapon.png",
            "/static/images/gashapon/3Gachapon.png",
            "/static/images/gashapon/4Gachapon.png",
            "/static/images/gashapon/3Gachapon.png",
            "/static/images/gashapon/2Gachapon.png",
            "/static/images/gashapon/1Gachapon.png"
        ];

        var rewards = [
            {value: 500, probability: 0.005}, // 1% de probabilidad
            {value: 100, probability: 0.025},  // 2.5% de probabilidad
            {value: 50, probability: 0.05},  // 5% de probabilidad
            {value: 10, probability: 0.16}, // 16% de probabilidad
            {value: 5, probability: 0.30},   // 30% de probabilidad
            {value: 2, probability: 0.40}, // 40% de probabilidad
            {name: "pirata", probability: 0.01}, // 1% de probabilidad
            {name: "astronauta", probability: 0.01}, // 1% de probabilidad
            {name: "rey", probability: 0.01}, // 1% de probabilidad
            {name: "capitan", probability: 0.01}, // 1% de probabilidad
            {name: "tigre", probability: 0.01}, // 1% de probabilidad
            {name: "vikingo", probability: 0.01} // 1% de probabilidad
        ];


        var currentIndex = 0;
        var rotationTimeout;

        function changeImage() {
            imagenElement.src = imageSources[currentIndex];
            currentIndex = (currentIndex + 1) % imageSources.length; // Circular rotation
            rotationTimeout = setTimeout(changeImage, 300); // Change image every 300 milliseconds
        }

        function stopRotation() {
            clearTimeout(rotationTimeout);
            document.querySelector('#ruedecilla').style.display = "block";
            mostrarRecompensa();
        }

        // Función para mostrar la recompensa
        function mostrarRecompensa() {
            var randomNumber = Math.random(); // Generar un número aleatorio entre 0 y 1

            var accumulatedProbability = 0;
            for (var i = 0; i < rewards.length; i++) {
                accumulatedProbability += rewards[i].probability;
                if (randomNumber <= accumulatedProbability) {
                    var recompensa = rewards[i];

                    if (recompensa.value) {
                        // Si es un valor monetario, simplemente actualizar el dinero del usuario
                        premio = recompensa.value;
                        actualizarDineroUsuario(premio);
                        agregarDinero();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Enhorabuena!',
                            text: "Has ganado una recompensa: " + recompensa.value + "KC!",
                            confirmButtonText: 'Salir',
                            confirmButtonColor: '#3085d6',
                            backdrop: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                        });

                    } else if (recompensa.name) {
                        // Si es un avatar, realizar acciones específicas para el tipo de avatar
                        manejarAvatar(recompensa.name);
                        Swal.fire({
                            icon: 'success',
                            title: '¡Enhorabuena!',
                            text: "¡Has ganado una recompensa: Avatar " + recompensa.name + "!",
                            confirmButtonText: 'Salir',
                            confirmButtonColor: '#3085d6',
                            backdrop: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                        });
                    }

                    break;
                }
            }
        }

        // Iniciar la rotación de la imagen
        changeImage();

        // Detener la rotación después de 2.1 segundos (2100 milisegundos)
        setTimeout(stopRotation, 2100);
    }
}

function manejarAvatar(tipoAvatar) {
    // Realizar acciones específicas para cada tipo de avatar
    switch (tipoAvatar) {
        case "pirata":
            if (PIRATA == 0) {
                activarColumnaGashapon(id_usuario, "pirata");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: pirata. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        case "astronauta":
            if (ASTRONAUTA == 0) {
                activarColumnaGashapon(id_usuario, "astronauta");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: astronauta. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        case "rey":
            if (REY == 0) {
                activarColumnaGashapon(id_usuario, "rey");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: Rey. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        case "capitan":
            if (CAPITAN == 0) {
                activarColumnaGashapon(id_usuario, "capitan");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: Capitan. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        case "tigre":
            if (TIGRE == 0) {
                activarColumnaGashapon(id_usuario, "tigre");
            } else {
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: Tigre. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        case "vikingo":
            if (VIKINGO == 0) {
                activarColumnaGashapon(id_usuario, "vikingo");
            } else {
               Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Ya tienes este avatar: Vikingo. Te devolvemos el dinero.",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
                actualizarDineroUsuario(apuesta);
                agregarDinero();
            }
            break;
        default:
            // Acciones por defecto o manejar otros avatares si es necesario
            break;
    }
}

document.getElementById("botonComprarMonedas").addEventListener("click", function () {
    window.location.href = "/dinero/";
});

function actualizarDineroUsuario(cantidad) {
    let dineroUsuarioElement = document.querySelector('#monedasUsuario');
    dineroUsuarioElement.textContent = parseFloat(dineroUsuarioElement.textContent) + cantidad;
}

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;

function volverAtras() {
    if (prevUrl.indexOf(window.location.host) !== -1) {
        // Ir a la página anterior
        window.history.back();
    }
}










