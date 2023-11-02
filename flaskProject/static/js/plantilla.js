/* MENU HAMBURGUESA */
var menu = document.querySelector('.bars__menu');

// SEMAFOROS DE CONTROL
let submenus = true;

// hacer click en las 3 rayas
menu.addEventListener('click', () => {
    // HOME
    if(submenus) {
        submenus = false;
        mostrar();
        block = true;
    } else {
        submenus = true;
        ocultar();
        block = false;
    }
});

// mostrar los submenus
function mostrar(){
    setTimeout( () => {
        document.querySelector('.out').style.cursor = 'pointer';
        document.querySelector('.out').style.opacity = 1;
    }, 200);
    setTimeout( () => {
        document.querySelector('.home').style.cursor = 'pointer';
        document.querySelector('.home').style.opacity = 1;
    }, 300);
    setTimeout( () => {
        document.querySelector('.ajustes').style.cursor = 'pointer';
        document.querySelector('.ajustes').style.opacity = 1;
    }, 400);
    setTimeout( () => {
        document.querySelector('.buscador').style.cursor = 'pointer';
        document.querySelector('.buscador').style.opacity = 1;
    }, 500);
    setTimeout( () => {
        document.querySelector('.volume').style.cursor = 'pointer';
        document.querySelector('.volume').style.opacity = 1;
    }, 600);
}

// ocultar los submenus
// NO OCURRE HASTA Q TERMINA LA ANIMACION DEL MENU PRINCIPAL
function ocultar(){
    setTimeout( () => {
        document.querySelector('.volume').style.cursor = 'default';
        document.querySelector('.volume').style.opacity = 0;
    }, 200);
    setTimeout( () => {
        document.querySelector('.buscador').style.cursor = 'default';
        document.querySelector('.buscador').style.opacity = 0;
    }, 300);
    setTimeout( () => {
        document.querySelector('.ajustes').style.cursor = 'default';
        document.querySelector('.ajustes').style.opacity = 0;
    }, 400);
    setTimeout( () => {
        document.querySelector('.home').style.cursor = 'default';
        document.querySelector('.home').style.opacity = 0;
    }, 500);
    setTimeout( () => {
        document.querySelector('.out').style.cursor = 'default';
        document.querySelector('.out').style.opacity = 0;
    }, 600);
}

let block = false;
var bars_search = document.getElementById('ctn-bars-search');
var cover_search = document.getElementById('cover-ctn-search');
var box_search = document.getElementById('box-search');
var inputSearch = document.getElementById('inputSearch')
// PONER BUSCADOR
function ponerBuscador(){
    if(block){
        inputSearch.value = '';
        bars_search.style.display = 'block';
        setTimeout(() => {
            bars_search.style.opacity = 1;
            cover_search.style.display = 'block';
            inputSearch.focus();
        }, 100);
    }
}

function cerrarBuscador(){
    bars_search.style.opacity = 0;
    cover_search.style.display = 'none';
    box_search.style.display = 'none';
    setTimeout(() => {
        bars_search.style.display = 'none';
    }, 100);
}

function resultadosBusqueda(){box_search.style.display = 'block';}

function cerrarSesion(){if(block) document.location.assign('http://127.0.0.1:5000/Inicio/');}

var filter = '';
var li = '';
var textValue = '';
var miBusqueda = '';

// CREANDO FILTRADO DE BUSQUEDA
inputSearch.addEventListener("keyup", () => {
    miBusqueda = inputSearch.value.toUpperCase();
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");
    // recorriendo elementos a filtrar mediante los 'li'
    for(let i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){  // como en SO de si funciona o no devuelve 'x' valor
            li[i].style.display = '';
            box_search.style.display = 'block';

            if(inputSearch.value === ''){
                box_search.style.display = 'none';
            }

        } else {
            li[i].style.display = 'none';
        }
    }
});

// redirigimiento de paginas en el buscador
function paginaHome(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/');} //window.location = "pantallaJuegos.html";
function paginaAjustes() { if (block) document.location.assign('http://127.0.0.1:5000/Perfil_de_usuario/');}
function cartas(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_cartas/Carta_mas_alta/?');}
function blackJack(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_cartas/Blackjack/?');}
function poker(){ if(block) document.location.assign('hhttp://127.0.0.1:5000/Juegos/Indice_cartas/Poker/?');}
function craps(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_Dados/Craps/?');}
function ruleta(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Ruleta/?');}
function tragaperras(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Slots');}
function plinko(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Plinko');}
function kongoRun(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/KonguitoRun');}
function bingo(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Bingo');}
function eventos(){ if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Eventos/?');}

// ir a ingresar dinero
function ingresarDinero(){
    window.location.href = "/dinero/";
}

//var localizacion = '';
// eventos de teclado
function teclaPresionada(){
    tecla = event.keyCode;
    if(tecla === 27){
        return cerrarBuscador();
    }
    else if(tecla === 13){
        if(miBusqueda ===  'HOME') paginaHome();
        else if(miBusqueda === 'PERFIL') {
            //localizacion = window.location;
            paginaAjustes();
        }
        else if(miBusqueda === 'CARTA MÁS ALTA') cartas();
        else if(miBusqueda === 'BLACKJACK') blackJack();
        else if(miBusqueda === 'POKER') poker();
        else if(miBusqueda === 'DADOS CRAPS') craps();
        else if(miBusqueda === 'RULETA') ruleta();
        else if(miBusqueda === 'KONGO RUN') kongoRun();
        else if(miBusqueda === 'TRAGAPERRAS') tragaperras();
        else if(miBusqueda === 'PLINKO') plinko();
        else if(miBusqueda === 'BINGO') bingo();
        else if(miBusqueda === 'EVENTOS') eventos();
    }
}

window.onkeydown = teclaPresionada;z