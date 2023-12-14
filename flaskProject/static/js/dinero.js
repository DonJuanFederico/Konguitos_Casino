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
                        Swal.fire({
                            icon: 'success',
                            title: 'Ingreso realizado',
                            text: "Se ha ingresado " + monto + "€ a tu cuenta.",
                            confirmButtonText: 'Salir',
                            confirmButtonColor: '#3085d6',
                            backdrop: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "No se ha podido realizar el ingreso",
                            confirmButtonText: 'Salir',
                            confirmButtonColor: '#3085d6',
                            backdrop: true,
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                        });
                    }
                    location.reload(); // Recarga la página
                }
            };
            //Espere 1 segundo para que se actualice la base de datos
            setTimeout(function () {
                xhr.send("&cantidad_a_agregar=" + monto);
            }, 1000);
        }
    } else {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Por favor ingresa un número positivo con dos decimales como máximo.",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }
}

function retirarDinero() {
    let saldoActual = parseFloat(document.getElementById("valorSaldo").textContent);
    var monto = parseFloat(document.getElementById("retirar").value);
    if (!isNaN(monto) && monto > 0) {
        // Muestra un mensaje de confirmación
        if (confirm("¿Estás seguro de que deseas retirar dinero?")) {
            if (monto > saldoActual) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "No puedes retirar más de lo que tienes",
                    confirmButtonText: 'Salir',
                    confirmButtonColor: '#3085d6',
                    backdrop: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                });
            } else {
                // Enviar solicitud HTTP a tu servidor Flask
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/retirar_dinero", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Retiro realizado',
                                text: "Se ha retirado " + monto + "€ de tu cuenta.",
                                confirmButtonText: 'Salir',
                                confirmButtonColor: '#3085d6',
                                backdrop: true,
                                allowOutsideClick: true,
                                allowEscapeKey: true,
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: "No se ha podido realizar el retiro",
                                confirmButtonText: 'Salir',
                                confirmButtonColor: '#3085d6',
                                backdrop: true,
                                allowOutsideClick: true,
                                allowEscapeKey: true,
                            });
                        }
                        location.reload(); // Recarga la página
                    }
                };
                //Espera 1 segundo para que se actualice la base de datos
                setTimeout(function () {
                    xhr.send("&cantidad_a_retirar=" + monto);
                }, 1000);
            }
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Por favor ingresa un número positivo con dos decimales como máximo.",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }
}