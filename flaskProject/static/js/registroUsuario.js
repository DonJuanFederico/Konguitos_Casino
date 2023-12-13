console.log('registroUsuario.js cargado...');

document.addEventListener("DOMContentLoaded", function() {
  var password = document.getElementById('contraseña');
  var password2 = document.getElementById('contraseña2');
  var primera = document.getElementById('primera');
  var segunda = document.getElementById('segunda');
  var enlaceTerminos = document.getElementById('enlaceTerminos');

    // Agregar un evento de clic al enlace
    enlaceTerminos.addEventListener('click', function(event) {
        // Prevenir el comportamiento predeterminado del enlace (evitar el desplazamiento)
        event.preventDefault();

        // Redirigir a la página de términos y condiciones
        window.location.href = '/Registro/terminosCondiciones.html';
    });
  primera.addEventListener('click', function() {
    if (password.type === "password") {
      password.type = "text";
      primera.classList.add('bx-show-alt');
      primera.classList.remove('bx-hide');
    } else {
      password.type = "password";
      primera.classList.remove('bx-show-alt');
      primera.classList.add('bx-hide');
    }
  });

  segunda.addEventListener('click', function() {
      if (password2.type === "password") {
          password2.type = "text";
          segunda.classList.add('bx-show-alt');
          segunda.classList.remove('bx-hide');
      } else {
          password2.type = "password";
          segunda.classList.remove('bx-show-alt');
          segunda.classList.add('bx-hide');
      }
  });
});

function volverAtras() {
        document.location.href = '/';
    }