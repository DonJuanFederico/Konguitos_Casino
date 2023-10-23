const card = document.getElementById('card');

function agregarDinero() {
    var monto = parseFloat(document.getElementById("ingresar").value);
    if (!isNaN(monto) && monto > 0) {
        // Muestra un mensaje de confirmación
        if (confirm("¿Estás seguro de que deseas ingresar dinero?")) {
            // Enviar solicitud HTTP a tu servidor Flask
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/agregar_dinero", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        alert("Ingreso realizado");
                    } else {
                        alert("Error al procesar la solicitud");
                    }
                    location.reload(); // Recarga la página
                }
            };
            xhr.send("&cantidad_a_agregar=" + monto);
        }
    } else {
        alert("Por favor ingresa un número positivo con dos decimales como máximo.");
    }
}

function retirarDinero() {
    let saldoActual = parseFloat(document.getElementById("valorSaldo").textContent);
    var monto = parseFloat(document.getElementById("retirar").value);
    if (!isNaN(monto) && monto > 0) {
        // Muestra un mensaje de confirmación
        if (confirm("¿Estás seguro de que deseas retirar dinero?")) {
            if (monto > saldoActual) {
                alert("No puedes terirar más de lo que tienes");
            } else {
                // Enviar solicitud HTTP a tu servidor Flask
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/retirar_dinero", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            alert("Retiro realizado");
                        } else {
                            alert("Error al procesar la solicitud");
                        }
                        location.reload(); // Recarga la página
                    }
                };
                xhr.send("&cantidad_a_retirar=" + monto);
            }
        }
    }else {
        alert("Por favor ingresa un número positivo con dos decimales como máximo.");
    }
}