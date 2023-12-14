var socket = io();
var buscarPartida = false;

document.getElementById("botonComprarMonedas").addEventListener("click", function() {
    window.location.href = "/dinero/";
});

//Falta div reglas
document.getElementById("divReglas").addEventListener("click", function() {
    Swal.fire({
        title: 'Bienvenido al bingo',
        html: "<div class='custom-content'>" +
            "<h3>Importante:</h3>" +
            "1. Cree su cartón y cuando esté conforme guárdalo." +
            "<br>2. Una vez guardado, se le cobrará y queda a su responsabilidad jugar a continuación." +
            "<br>3. Si abandona la sala no se le devolverá el dinero y Konguitos Casino no se hace responsable." +
            "<br>4. Recompensa por cantar LÍNEA el primero: 5 KC." +
            "<br>5. Recompensa por cantar DOBLE LÍNEA el primero: 10 KC." +
            "<br>6. Recompensa por cantar BINGO: 50 KC!!!" +
            "<br>6. Precio del cartón de: 19 KC" +
            "</div>",
        confirmButtonText: '¡A por las bolas!',
        confirmButtonColor: '#31a820',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
    });
});

document.getElementById("Formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Para prevenir el comportamiento predeterminado del formulario
    crearSala(); // Llama a tu función aquí
});

function crearSala() {
    var nombrePartida = document.getElementById("nombrePartida").value;
    if (buscarPartida ) {
        if(nombrePartida.length > 0){
            nombrePartida = nombrePartida.charAt(0).toUpperCase() + nombrePartida.slice(1).toLowerCase();
            var xhr = new XMLHttpRequest();
            // Primera solicitud para crear la partida
            xhr.open("POST", "/crear_partidaPokerDados", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        if (xhr.responseText === "La partida ya existe") {
                            Swal.fire({
                                title: 'Usa otro nombre, ya hay una sala que lo utiliza',
                                confirmButtonText: 'Entendido',
                                confirmButtonColor: '#a8209d',
                                backdrop: true,
                                allowOutsideClick: true,
                                allowEscapeKey: true,
                                allowEnterKey: true,
                            });
                        } else {
                            var xhr2 = new XMLHttpRequest();
                            xhr2.open("POST", "/partidaPokerDados", true);
                            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr2.onreadystatechange = function() {
                                if (xhr2.readyState === XMLHttpRequest.DONE) {
                                    // La segunda solicitud ha finalizado
                                    if (xhr2.status === 200) {
                                        // Redirigir a la página partidaBingo
                                        window.location.href = "/partidaBingo";
                                    } else {
                                        alert("Error al crear la partida");
                                    }
                                }
                            };
                            xhr2.send("&sala=" + nombrePartida);
                        }
                    } else {
                        alert("Error al crear la partida");
                    }
                }
            };
            // Enviar la primera solicitud para crear la partida
            xhr.send("&nombre_partida=" + nombrePartida);
        } else {
            Swal.fire({
                title: 'Ponga un nombre a la sala!',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#a82020',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
            });
        }
    } else {
        Swal.fire({
            title: 'Guarde el cartón antes de jugar',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#9a20a8',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
        });
    }
}


document.getElementById("unirseSala").addEventListener("click", function() {
    var roomsContent = document.getElementById('rooms').innerHTML;
    if(buscarPartida){
        // Mostrar el cuadro de diálogo con el contenido de las salas disponibles
        Swal.fire({
            title: 'Salas disponibles',
            html: "<div class='custom-content'>" + roomsContent + "</div>",
            confirmButtonText: '¡Salir!',
            confirmButtonColor: '#708baf',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
        });
    }else{
        Swal.fire({
            title: 'Antes de unirte a una sala crea un cartón y guardalo',
            confirmButtonText: '¡Vamos a ello!',
            confirmButtonColor: '#afa570',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
        });
    }
});

function enviarSala(sala) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/partidaPokerDados", true); // Nueva ruta para verificar la sala
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "Sala no disponible") {
                    Swal.fire({
                        title: 'Esa sala acaba de llenarse, mala suerte',
                        confirmButtonText: 'Buscar otra sala',
                        confirmButtonColor: '#00ffd9',
                        backdrop: true,
                        allowOutsideClick: true,
                        allowEscapeKey: true,
                        allowEnterKey: true,
                    }).then(() => {
                        // Buscar el elemento de la sala y eliminarlo del DOM
                        var rooms = document.getElementsByClassName('select-room');
                        for (var i = 0; i < rooms.length; i++) {
                            if (rooms[i].innerHTML === sala) {
                                rooms[i].parentNode.removeChild(rooms[i]);
                                break; // Detener el bucle
                            }
                        }
                    });
                } else {
                    window.location.href = "/partidaBingo";
                }
            } else {
                alert("Error al unirse a la sala");
            }
        }
    };
    xhr.send("sala=" + sala); // Envía la solicitud con el nombre de la sala
}

function retirarDinero() {
    /* De momento esto fuera
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + precioCarton);
    */
}