const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');
const buttonLeft = document.getElementById('botonIzquierda');
const buttonRight = document.getElementById('botonDerecha');

const sliderElements = document.querySelectorAll(".slider_element")

const rootStyles = document.documentElement.style;

let slideCounter = 0;
let isInTransition = false;

const DIRECTION = {
    RIGHT: "RIGHT",
    LEFT: "LEFT"
};

const getTransformValue = ()=>
    Number(rootStyles.getPropertyValue("--slide-transform").replace("%", ""));

const reorderSlide = () =>{
    const transformValue = getTransformValue();
    rootStyles.setProperty("--transition", "none");
    if(slideCounter===((sliderElements.length/3)-1)){
        slider.appendChild(slider.firstElementChild);
        slider2.appendChild(slider2.firstElementChild);
        slider3.appendChild(slider3.firstElementChild);
        rootStyles.setProperty("--slide-transform", `${transformValue + 100}%`);
        slideCounter--;
    }else if(slideCounter===0){
        slider.prepend(slider.lastElementChild);
        slider2.prepend(slider2.lastElementChild);
        slider3.prepend(slider3.lastElementChild);
        rootStyles.setProperty("--slide-transform", `${transformValue - 100}%`);
        slideCounter++;
    }
    isInTransition = false;
}

const moveSlide = (direction)=>{
    if(isInTransition) return;
    const transformValue = getTransformValue();
    rootStyles.setProperty("--transition", "transform 1s");
    isInTransition = true;
    if(direction===DIRECTION.LEFT){
        rootStyles.setProperty("--slide-transform", `${transformValue + 100}%`);
        slideCounter--;
    }else if(direction===DIRECTION.RIGHT){
        rootStyles.setProperty("--slide-transform", `${transformValue - 100}%`);
        slideCounter++;
    }
}

buttonRight.addEventListener("click", ()=>moveSlide(DIRECTION.RIGHT));
buttonLeft.addEventListener("click", ()=>moveSlide(DIRECTION.LEFT));

slider.addEventListener("transitionend", reorderSlide);
slider2.addEventListener("transitionend", reorderSlide);
slider3.addEventListener("transitionend", reorderSlide);
reorderSlide();


// Recorrer cada imagen y agregar el listener
document.querySelectorAll('img.cartas').forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        window.location.href = '/Juegos/Indice_cartas/';
    });
});

// Recorrer cada imagen y agregar el listener
document.querySelectorAll('img.dados').forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        window.location.href = '/Juegos/Indice_Dados/';
    });
});

document.querySelectorAll('img.ruleta').forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        window.location.href = '/Juegos/Ruleta/';
    });
});

document.querySelectorAll('img.extra').forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        window.location.href = '/Juegos/Juegos_extra/';
    });
});

document.querySelectorAll('img.eventos').forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        window.location.href = '/Juegos/Eventos/';
    });
});

//Gestión Avatar
function cambiarAvatar(){document.location.href = '/Perfil_de_usuario/';}

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