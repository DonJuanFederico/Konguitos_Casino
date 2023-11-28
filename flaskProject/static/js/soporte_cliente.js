function submitForm() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "konguitoscasino@gmail.com",
        Password: "2DB4453A401536B9130EE762B2227BA52353",
        To: 'konguitoscasino@gmail.com',
        From: "konguitoscasino@gmail.com",
        Subject: "Nueva incidencia de: " + document.getElementById("name").value,
        Body: "Name: " + document.getElementById("name").value +
            "<br/> Email: " + document.getElementById("email").value +
            "<br/> Message: " + document.getElementById("message").value + "<br/>"
    }).then(
        message => alert(message)
    );

    return alert("Mensaje enviado");
}