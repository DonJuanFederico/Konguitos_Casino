function guardarId() {
    var form = document.getElementById('chatForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío predeterminado del formulario
        var nombre = document.getElementById('lname').value;
        var id = document.getElementById('numeroId').value;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/guardar_datos", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                // Redirigir al usuario al chat después de guardar los datos
                window.location.href = "/chat/" + id;
            }
        };
        var datos = "nombre=" + encodeURIComponent(nombre) + "&id=" + encodeURIComponent(id);
        xhr.send(datos);
    });
}
var socket = io();

socket.on("cartonRecibido", data => {
    const stringCarton = JSON.stringify(data.carton_generado);
    const valores = stringCarton.split(',').map(valor => valor.replace(/\[|\]/g, '').trim());
    const spans = document.querySelectorAll('div > span');
    // Recorrer los spans y rellenarlos con los valores del array
    spans.forEach((span, index) => {
        if (valores[index] !== '\"\"'){
            span.textContent = valores[index];
        }else{
            span.textContent = "";
        }
    });
});

document.querySelector("#pedir").onclick = () => {
    socket.emit("pedirCarton");
}

socket.on("nuevo_valor_contador", data => {
    document.getElementById("contador").innerText = data.valor;
});

document.querySelector("#probando").onclick = () => {
    sumar();
    socket.emit("anadir", {"username" : username, "room": room, "valor": document.getElementById("contador").innerText});
}