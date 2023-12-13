var socket = io();
let stringCarton = "";
var precioCarton = 19;
socket.on("cartonRecibido", data => {
    stringCarton = JSON.stringify(data.carton_generado);
    const valores = stringCarton.split(',').map(valor => valor.replace(/\[|\]/g, '').trim());
    const spans = document.querySelectorAll('#carton > div > span');
    // Recorrer los spans y rellenarlos con los valores del array
    spans.forEach((span, index) => {
        if (valores[index] !== '\"\"'){
            span.textContent = valores[index];
        }else{
            span.textContent = "";
        }
    });
});

var cartonCreado = false;
var buscarPartida = false;

document.querySelector("#pedir").onclick = () => {
    socket.emit("pedirCarton");
    cartonCreado = true;
}

document.getElementById("botonComprarMonedas").addEventListener("click", function() {
    window.location.href = "/dinero/";
});

socket.on("nuevo_valor_contador", data => {
    document.getElementById("contador").innerText = data.valor;
});

document.getElementById('guardar').addEventListener('click', function() {
    if(cartonCreado ) {
        if (parseFloat(document.getElementById("monedasUsuario").textContent) >= parseFloat(precioCarton)){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/guardar_carton", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send();
            retirarDinero();
            document.getElementById('monedasUsuario').innerText = Math.round((parseFloat(document.getElementById('monedasUsuario').innerText) - parseFloat(precioCarton)) * 100) / 100;
            buscarPartida = true;
            var divs = document.querySelectorAll('#prueba > div');
            divs.forEach(function (div) {
                div.style.display = 'none';
            });
            var divs = document.querySelectorAll('#carton > div');
            document.querySelector('#carton').style.boxShadow = 'inset 0 0 5px #45d90a, 0 0 5px #45d90a';
            // Itera sobre cada div encontrado
            divs.forEach(function (div) {
                div.style.boxShadow = 'inset 0 0 5px #45d90a, 0 0 5px #45d90a';
            });
        }else{
            Swal.fire({
                title: 'No tienes dinero suficiente para jugar al bingo!',
                confirmButtonText: 'Compra KonguitoCoins',
                confirmButtonColor: '#19bdcc',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
            });
        }
    }else{
        Swal.fire({
            title: 'ATENCIÓN!',
            html: "<div class='custom-content'>" +
                "<h3>Crea el cartón antes de guardar algo</h3>" +
                "</div>",
            confirmButtonText: 'Sin problema',
            confirmButtonColor: '#a82020',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
        });
    }
});

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

document.getElementById("botonJugar").addEventListener("click", function() {
    var nombrePartida = document.getElementById("nombrePartida").value;
    if (buscarPartida ) {
        if(nombrePartida.length > 0){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/crear_partida", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("&nombre_partida=" + nombrePartida);
            window.location.href = "/partidaBingo";
        }else{
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
    }else{
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
});

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

function alerta(newRoom) {
    window.location.href = "/partidaBingo";
}

function retirarDinero() {
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + precioCarton);
}