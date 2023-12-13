
function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Check if all required fields are filled
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        alert("Por favor, complete todos los campos.");
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
            alert("Incidencia enviada");
        }
    );
}

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;
function volverAtras(){
    if(prevUrl.indexOf(window.location.host) !== -1) {
    // Ir a la página anterior
    window.history.back();
    }
}