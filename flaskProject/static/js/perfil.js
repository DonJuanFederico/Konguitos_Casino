var nombre_usuario = document.getElementById('introducir');
var email = document.getElementById('introducir1');
var password = document.getElementById('introducir2');
var street = document.getElementById('introducir3');
var postal_code = document.getElementById('introducir4');
var card_number = document.getElementById('introducir5');
var card_name = document.getElementById('introducir6');
var card_date = document.getElementById('introducir7');
var cvv = document.getElementById('introducir8');
var dni = document.querySelector('.input_dni');
var picture = document.getElementById('introducir10');

var ver = document.querySelector('.ver');
var no_ver = document.querySelector('.no_ver');

function editarDatos() {
    if(password.type === 'text'){
        password.type = 'password';
    }
    nombre_usuario.disabled = !nombre_usuario.disabled;
    email.disabled = !email.disabled;
    password.disabled = !password.disabled;
    street.disabled = !street.disabled;
    postal_code.disabled = !postal_code.disabled;
    card_number.disabled = !card_number.disabled;
    card_name.disabled = !card_name.disabled;
    card_date.disabled = !card_date.disabled;
    cvv.disabled = !cvv.disabled;
    dni.disabled = !dni.disabled;
    picture.disabled = !picture.disabled;
}

function verContrasenna(){
    if (password.type === 'password') {
        password.type = 'text';
        ver.style.opacity = 1;
        no_ver.style.opacity = 0;

    } else {
        password.type = 'password';
        ver.style.opacity = 0;
        no_ver.style.opacity = 1;
    }
}