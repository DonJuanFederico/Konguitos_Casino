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

// obtenemos todos los valores de todos los temporizadores
var diasE1 = document.getElementById('daysE1');
var diasE2 = document.getElementById('daysE2');
var diasE3 = document.getElementById('daysE3');

var hoursE1 = document.getElementById('hoursE1');
var hoursE2 = document.getElementById('hoursE2');
var hoursE3 = document.getElementById('hoursE3');

var minsE1 = document.getElementById('minsE1');
var minsE2 = document.getElementById('minsE2');
var minsE3 = document.getElementById('minsE3');

var secsE1 = document.getElementById('secsE1');
var secsE2 = document.getElementById('secsE2');
var secsE3 = document.getElementById('secsE3');

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

/*setInterval(() => {
    let hora = new Date();
    tempo.innerHTML = hora.toLocaleTimeString();
}, 1000);*/

let dias = 3;
let horas = 7;
let minutos = 0;
let segundos = 0;

cargarSecs();
// segundos del evento 1
function cargarSecs(){
    //let txtSeg;
    if(segundos < 0) segundos = 59;
    // mostrar por pantalla
    if(segundos < 10) {
        txtSeg = `0${segundos}`;
    } else {
        txtSeg = segundos;
    }
    secsE1.innerHTML = txtSeg;
    segundos--;
    cargarMinutos(segundos);
}
function cargarMinutos(segundos){
    //let txtMin;
    if(segundos === -1 && minutos !== 0){
        setTimeout(() => {
            minutos--;
        }, 500);
    } else if(segundos === -1 && minutos === 0){
        setTimeout(() => {
            minutos = 59;
        }, 500);
    }
    // mostrar por pantalla
    if(minutos < 10) {
        txtMin = `0${minutos}`;
    } else {
        txtMin = minutos;
    }
    minsE1.innerHTML = txtMin;
    cargarHoras(segundos, minutos);
}

function cargarHoras(segundos, minutos){
    //let txtMin;
    if(segundos === -1 && minutos === 0 && horas !== 0){
        setTimeout(() => {
            horas--;
        }, 500);
    } else if(segundos === -1 && minutos === 0 && horas === 0){
        setTimeout(() => {
            horas = 23;
        }, 500);
    }
    // mostrar por pantalla
    if(horas < 10) {
        txtHor = `0${horas}`;
    } else {
        txtHor = horas;
    }
    hoursE1.innerHTML = txtHor;
    cargarDias(segundos, minutos, horas);
}

function cargarDias(segundos, minutos, horas){
    //let txtMin;
    if(segundos === -1 && minutos === 0 && horas === 0 && dias !== 0){
        setTimeout(() => {
            dias--;
        }, 500);
    } else if(segundos === -1 && minutos === 0 && horas === 0 && dias === 0){
        setTimeout(() => {
            dias = 23;
        }, 500);
    }
    // mostrar por pantalla
    if(dias < 10) {
        txtDia = `0${dias}`;
    } else {
        txtDia = dias;
    }
    diasE1.innerHTML = txtDia;
}
setInterval(cargarSecs, 1000);
