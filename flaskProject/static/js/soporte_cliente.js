 function submitForm() {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;

            if(name && email && message) {
                alert('Gracias, ' + name + '. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.');
                document.getElementById('contact-form').submit();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        }