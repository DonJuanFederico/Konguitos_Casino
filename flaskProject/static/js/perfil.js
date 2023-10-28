var nombre = document.getElementById('introducir');
var email = document.getElementById('introducir1');
var tarjeta = document.getElementById('introducir2');
var password = document.getElementById('introducir3');

var editar = document.querySelector('.edit');

editar.addEventListener('click', () => {
    nombre.disabled = !nombre.disabled;
    email.disabled = !email.disabled;
    tarjeta.disabled = !tarjeta.disabled;
    password.disabled = !password.disabled;
});