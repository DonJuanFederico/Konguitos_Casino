function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Check if all required fields are filled
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, complete todos los campos.',
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        return;
    }

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "konguitoscasino@gmail.com",
        Password: "2DB4453A401536B9130EE762B2227BA52353", // Add your password here
        To: 'konguitoscasino@gmail.com',
        From: "konguitoscasino@gmail.com",
        Subject: "Nueva incidencia de: " + name,
        Body: "Nombre de usuario: " + name +
            "<br/> Email: " + email +
            "<br/> Mensaje: " + message + "<br/>"
    }).then(
        function (message) {
            Swal.fire({
                icon: 'success',
                title: 'Incidencia enviada',
                text: 'Su incidencia ha sido enviada con éxito, en breve nos pondremos en contacto con usted.',
                confirmButtonText: 'Salir',
                confirmButtonColor: '#3085d6',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
            });
        }
    );
}

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;

function volverAtras() {
    if (prevUrl.indexOf(window.location.host) !== -1) {
        // Ir a la página anterior
        window.history.back();
    }
}