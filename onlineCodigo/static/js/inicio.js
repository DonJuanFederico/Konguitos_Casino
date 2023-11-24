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




/*
function unirse() {
    var id = document.getElementById('numeroId').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/unirse", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("id=" + id);
}*/