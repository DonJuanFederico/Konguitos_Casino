//Cargar imagen actual del perfil
document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log("Respuesta del servidor:", data);
                const nombrePersonaje = data.resultado.personaje; // Asigna el nombre del personaje
                const colorFondo = data.resultado.fondo;
                console.log("Nombre del personaje obtenido:", nombrePersonaje);

                const rutaBase = "/static/images/avatares/";
                const rutaAvatarCompleta = rutaBase + nombrePersonaje + ".png";
                const contenedorAvatar = document.querySelector('.imagen');

                contenedorAvatar.style.backgroundColor = colorFondo;
                contenedorAvatar.style.backgroundImage = `url('${rutaAvatarCompleta}')`;

            } else {
                console.error('Error al obtener el nombre del personaje:', xhr.status);
            }
        }
    };

    xhr.open("GET", "/obtener_avatar", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();
});


// campos para poder editar
var nombre_usuario = document.getElementById('introducir');
var email = document.getElementById('introducir1');
var street = document.getElementById('introducir3');
var postal_code = document.getElementById('introducir4');
var card_number = document.getElementById('introducir5');
var card_name = document.getElementById('introducir6');
var card_date = document.getElementById('introducir7');
var cvv = document.getElementById('introducir8');
var dni = document.querySelector('.input_dni');
var picture = document.getElementById('introducir10');

// funcion para permitir la edicion de datos
function editarDatos() {
    nombre_usuario.disabled = !nombre_usuario.disabled;
    email.disabled = !email.disabled;
    street.disabled = !street.disabled;
    postal_code.disabled = !postal_code.disabled;
    card_number.disabled = !card_number.disabled;
    card_name.disabled = !card_name.disabled;
    card_date.disabled = !card_date.disabled;
    cvv.disabled = !cvv.disabled;
    dni.disabled = !dni.disabled;
    picture.disabled = !picture.disabled;
}

// funcion para "cambiar el avatar"
function cambiarAvatar(){document.location.href = '/Perfil_de_usuario/Avatar/';}

// funcion para leer los terminos y condiciones
function irATerminos(){document.location.href = '/Registro/terminosCondiciones.html';}

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;
function volverAtras(){
    if(prevUrl.indexOf(window.location.host) !== -1) {
    // Ir a la página anterior
    window.history.back();
    }
}

function requestContrasena(){
    // hacer q envie email automatico
    generarCodigoCorreo();
    document.location.href = '/nueva_pw/';
}

function generarCodigoCorreo(){
    codigoGenerado = Math.floor(Math.random() * 900000) + 100000;
}

/*
    hacer un swal.fire para realizar el cambio de idioma
    Para traducir la pagina la idea es q lea el texto de cada pagina y la traduzca (la aplicacion entera)
*/

