/* MENU HAMBURGUESA */
var menu = document.getElementById('bars__menu');

// SEMAFOROS DE CONTROL
let submenus = true;

// hacer click en las 3 rayas
menu.addEventListener('click', () => {
    // HOME
    if(submenus) {
        setTimeout(() => {submenus = false;}, 700);
        mostrar();
        block = true;
    } else {
        setTimeout(() => {submenus = true;}, 700)
        ocultar();
        block = false;
    }
});

// mostrar los submenus
function mostrar(){
    setTimeout( () => {
        document.getElementById('out').style.cursor = 'pointer';
        document.getElementById('out').style.opacity = 1;
    }, 100);
    setTimeout( () => {
        document.getElementById('home').style.cursor = 'pointer';
        document.getElementById('home').style.opacity = 1;
    }, 200);
    setTimeout( () => {
        document.getElementById('ajustes').style.cursor = 'pointer';
        document.getElementById('ajustes').style.opacity = 1;
    }, 300);
    setTimeout( () => {
        document.getElementById('buscador').style.cursor = 'pointer';
        document.getElementById('buscador').style.opacity = 1;
    }, 400);
    setTimeout( () => {
        document.getElementById('volume').style.cursor = 'pointer';
        document.getElementById('volume').style.opacity = 1;
    }, 500);
    setTimeout( () => {
        document.getElementById('headset').style.cursor = 'pointer';
        document.getElementById('headset').style.opacity = 1;
    }, 600);
    setTimeout( () => {
        document.getElementById('rank').style.cursor = 'pointer';
        document.getElementById('rank').style.opacity = 1;
    }, 700);
    setTimeout( () => {
        document.getElementById('trophy').style.cursor = 'pointer';
        document.getElementById('trophy').style.opacity = 1;
    }, 800);
}

// ocultar los submenus
// NO OCURRE HASTA Q TERMINA LA ANIMACION DEL MENU PRINCIPAL
function ocultar(){
    setTimeout( () => {
        document.getElementById('trophy').style.cursor = 'default';
        document.getElementById('trophy').style.opacity = 0;
    }, 100);
    setTimeout( () => {
        document.getElementById('rank').style.cursor = 'default';
        document.getElementById('rank').style.opacity = 0;
    }, 200);
    setTimeout( () => {
        document.getElementById('headset').style.cursor = 'default';
        document.getElementById('headset').style.opacity = 0;
    }, 300);
    setTimeout( () => {
        document.getElementById('volume').style.cursor = 'default';
        document.getElementById('volume').style.opacity = 0;
    }, 400);
    setTimeout( () => {
        document.getElementById('buscador').style.cursor = 'default';
        document.getElementById('buscador').style.opacity = 0;
    }, 500);
    setTimeout( () => {
        document.getElementById('ajustes').style.cursor = 'default';
        document.getElementById('ajustes').style.opacity = 0;
    }, 600);
    setTimeout( () => {
        document.getElementById('home').style.cursor = 'default';
        document.getElementById('home').style.opacity = 0;
    }, 700);
    setTimeout( () => {
        document.getElementById('out').style.cursor = 'default';
        document.getElementById('out').style.opacity = 0;
    }, 800);
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

// Obtener la dirección IP y el puerto desde la plantilla de Flask

function cerrarSesion(){if(block) document.location.href = '/Inicio/';}
''
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
function paginaHome(){ if(block) document.location.href = '/Juegos/';}
function paginaAjustes() { if (block) document.location.href = '/Perfil_de_usuario/';}
function ayuda() { if (block) document.location.href = '/soporte_cliente/';}
function desafios() { if (block) document.location.href = '/desafios_recompensas/';}
function cartas(){ if(block) document.location.href = '/Juegos/Indice_cartas/Carta_mas_alta/';}
function blackJack(){ if(block) document.location.href = '/Juegos/Indice_cartas/Blackjack/';}
function poker(){ if(block) document.location.href = '/Juegos/Indice_cartas/Poker/';}
function craps(){ if(block) document.location.href = '/Juegos/Indice_Dados/Craps/';}
function ruleta(){ if(block) document.location.href = '/Juegos/Ruleta/';}
function tragaperras(){ if(block) document.location.href = '/Juegos/Juegos_extra/Slots/';}
function plinko(){ if(block) document.location.href = '/Juegos/Juegos_extra/Plinko/';}
function kongoRun(){ if(block) document.location.href = '/Juegos/Juegos_extra/KonguitoRun/';}
function bingo(){ if(block) document.location.href = '/Juegos/Juegos_extra/Bingo/';}
function eventos(){ if(block) document.location.href = '/Juegos/Eventos/';}
function rankings(){if(block) document.location.href = '/Rankings/';}

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
        else if(miBusqueda === 'AYUDA') ayuda();
        else if(miBusqueda === 'DESAFIOS') desafios();
        else if(miBusqueda === 'RANKINGS') rankings();
    }
}
window.onkeydown = teclaPresionada;