var bloqueoEvento = true;

// obtener los elementos html
// obtenemos las cadenas
var blackout = document.querySelector('.blackout');
var blackout_2 = document.querySelector('.blackout_2');
var blackout_3 = document.querySelector('.blackout_3');

// obtenemos los diferentes eventos
var evento1 = document.getElementById('cargarCartaMasAlta');
var evento2 = document.getElementById('cargarBlackJack');
var evento3 = document.getElementById('cargarDino');

function unclockEvento(){
    blackout.style.display = 'none';   // quitar cadenas del evento 1
    evento1.classList.add('hover');    // hacemos q el evento del hover este disponible y visible
    bloqueoEvento = false;
}
function unclockEvento2(){
    blackout_2.style.display = 'none';
    evento2.classList.add('hover');
    bloqueoEvento = false;
}
function unclockEvento3(){
    blackout_3.style.display = 'none';
    evento3.classList.add('hover');
    bloqueoEvento = false;
}
function evento_1(){
    if(!bloqueoEvento){
        window.location.href = '';
    }
}
function evento_2(){
    if(!bloqueoEvento){
        window.location.href = '';
    }
}
function evento_3(){
    if(!bloqueoEvento){
        window.location.href = '';
    }
}