const deck = document.getElementById('deck');
const slots = document.querySelectorAll('.slot');
const suits = [' ♠', ' ♥', ' ♦', ' ♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let dealerCard = null;
const messageDiv = document.getElementById('message');

// Pone los palos a las cartas
function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(value + suit);
        }
    }
    return deck;
}

// baraja las cartas para q no tengan un orden
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function hideCards() {
    retirarDinero();
    for (let i = 0; i < slots.length; i++) {
        const card = document.createElement('div');
        card.className = 'card-face'; // Comienza oculta
        slots[i].textContent = '';
        slots[i].appendChild(card);
    }
}

// al repartir se ejecuta esto
function dealCards() {
    const deck = createDeck();
    shuffle(deck);
    for (let i = 0; i < slots.length; i++) {
        const card = document.createElement('div');
        card.className = 'card-back'; // Comienza oculta
        card.textContent = deck[i];
        if (i === 0) {
            dealerCard = card;
        }
        slots[i].textContent = '';
        slots[i].appendChild(card);
    }
}

 let bloqueo = false;

// IMPORTANTE: LA CARTA Nº 1 ES LA DEL DEALER
for (let i = 1; i < slots.length; i++) {
    slots[i].addEventListener('click', () => {
        if(!bloqueo) {
            bloqueo = true;

            slots[i].style.backgroundColor = 'rebeccapurple';
            /*
            cambiar los estilos de los diferentes metodos y comprobar si se cambia de color
             */

            dealCards();
            const card = slots[i].querySelector('.card-back');
            if (card.classList.contains('card-face')) {
                //card.classList.remove('card-face');
                card.classList.toggle('flipped');
            }
            if (i === 1 || 2 || 3 && dealerCard !== null) {
                //dealerCard.classList.remove('card-face');
                dealerCard.classList.toggle('flipped');
                const selectedCardValue = card.textContent;
                const dealerCardValue = dealerCard.textContent;
                compareCards(selectedCardValue, dealerCardValue);
                setTimeout(() => {
                    //revealAllCards(); // Revelar todas las cartas después de 1 segundo
                    repartir = false;
                }, 300);
            }
        }
    });
}

let repartir = false;

deck.addEventListener('click', () => {
    for (let i = 1; i < slots.length; i++) {
        slots[i].style.backgroundColor = '';
    }
    if(isNaN(parseFloat(document.getElementById('apuesta').value)) === false){
        if(!repartir) {
            repartir = true;
            bloqueo = false;
            messageDiv.textContent = '';
            // Pide la apuesta al usuario
            apuesta = parseFloat(document.getElementById('apuesta').value);
            saldo = Math.round((parseFloat(saldo) - parseFloat(apuesta)) * 100)/ 100;
            document.getElementById('monedas').textContent = saldo;
            // Verifica si la apuesta es válida
            if (apuesta <= 0) {
                alert('Tiene que apostar una cantidad mínima de 0.01 Konguito Coin.');
                return;
            } else if (apuesta > saldo) {
                alert('No tienes suficiente saldo para esta apuesta.');
                return;
            }
            hideCards();
        }
    } else {
        alert('Tiene que apostar una cantidad mínima de 0.01 Konguito Coin.');
    }
});

let saldo = document.getElementById('monedas').textContent;
let apuesta = parseFloat(document.getElementById('apuesta').value);

function retirarDinero() {
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function agregarDinero() {
    var monto = apuesta * 2;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}


function compareCards(selectedCardValue, dealerCardValue) {
    let message = '';
    // valores para poder comparar letras
    let card_2 = dealerCardValue.split(' ')[0]
    let card_1 = selectedCardValue.split(' ')[0]
    const valores = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    card_1 =  valores[card_1];
    card_2 =  valores[card_2];
    // Lógica de comparación de cartas (personaliza según tus reglas)
    if (card_1 === card_2) {
        message = 'Empate';
    } else if (card_1 > card_2) {
        message = '¡¡¡KONGUITO GANADOORRRR!!!';
    } else {
        message = 'Konguito caido... :´(';
    }
    messageDiv.textContent = message //+ '  |  ' + card_1 + '  |  ' + card_2;

    //apostar
    apuesta = parseFloat(document.getElementById('apuesta').value);
    // Realiza la apuesta
        if (saldo > 0 && apuesta <= saldo) {
            let gananciaPerdida = apuesta;
            if (messageDiv.textContent === '¡¡¡KONGUITO GANADOORRRR!!!') {
                saldo += 2 * apuesta;
                agregarDinero();
            /*} else if (messageDiv.textContent === 'Konguito caido... :´(') {
                gananciaPerdida = -apuesta;
                saldo -= apuesta;*/
            } else if (messageDiv.textContent === 'Empate') {
                gananciaPerdida = -apuesta / 2;
                saldo -= apuesta / 2;
                apuesta = apuesta / 2;
                retirarDinero();
            }
            document.getElementById('dinero').textContent = `Ganancias/Pérdidas: ${gananciaPerdida}`;
            // Muestra el saldo actualizado
            document.getElementById('monedas').textContent = `${saldo}`;
        } else {
            document.getElementById('dinero').textContent = `Ganancias/Pérdidas: No hay`;
        }
}

/*function revealAllCards() {
    for (let i = 1; i < slots.length; i++) {
        const card = slots[i].querySelector('.card-face');
        repartir = false;
        if (card.classList.contains('flipped')) {
            messageDiv.textContent = 'toto';
            //card.classList.remove('card-face');
            card.classList.toggle('flipped');
        }
    }
    //repartir = false;
}*/

//slots[3].addEventListener('click', () => {
    // La carta sola no es clickeable.
//});

/* MENU HAMBURGUESA */
var menu = document.querySelector('.bars__menu');
var line1__bars = document.querySelector('.line1__bars-menu');
var line2_5__bars = document.querySelector('.line2_5__bars-menu');
var line3__bars = document.querySelector('.line3__bars-menu');

/* BOTON HOME */
var barra_izq = document.querySelector('.verizq');
var barra_hor = document.querySelector('.hor');
var barra_der = document.querySelector('.verder');

/* BOTON AJUSTES */
var cir_grande = document.querySelector('.c_grande');

/* BUSCADOR */
var lupa = document.querySelector('.lupa');
var mango = document.querySelector('.mango');

// SEMAFOROS DE CONTROL
let cierre = true;
let submenus = true;

// hacer click en las 3 rayas
menu.addEventListener('click', () => {
    // animacion del menu principal al abrirse y cerrarse
    if(cierre) {
        cierre = false;
        animateBars();
    } else {
        setTimeout(() =>{
           animateBars();
        }, 400);
    }
    // HOME
    if(submenus) {
        submenus = false;
        mostrar();
        block = true;
        setTimeout(() => {
            home();
        }, 200);
        setTimeout(() => {
            ajustes();
        }, 400);
        setTimeout(() => {
            buscador();
        }, 600);
    } else {
        submenus = true;
        ocultar();
        block = false;
        setTimeout(() => {
            home();
        }, 200);
        setTimeout(() => {
            ajustes();
        }, 400);
        setTimeout(() => {
            buscador();
        }, 200);
    }
});

// MENU PRINCIPAL - ANIMACION
function animateBars(){
    // BURGER
    line1__bars.classList.toggle('activeline1__bars-menu');
    line2_5__bars.classList.toggle('activeline2_5__bars-menu');
    line3__bars.classList.toggle('activeline3__bars-menu');
}

// BOTON HOME - ANIMACION
function home(){
    barra_izq.classList.toggle('activeverizq');
    barra_hor.classList.toggle('activehor');
    barra_der.classList.toggle('activeverder');
}

// BOTON AJUSTES - ANIMACION
function ajustes(){
    cir_grande.classList.toggle('activec_grande');
}

// BUSCADOR - ANIMACION
function buscador(){
    lupa.classList.toggle('activelupa');
    mango.classList.toggle('activemango');
}

// mostrar los submenus
function mostrar(){
    setTimeout( () => {
        document.querySelector('.home').style.cursor = 'pointer';
        document.querySelector('.home').style.opacity = 1;
    }, 200);
    setTimeout( () => {
        document.querySelector('.ajustes').style.cursor = 'pointer';
        document.querySelector('.ajustes').style.opacity = 1;
    }, 300);
    setTimeout( () => {
        //document.querySelector('.ajustes').style.display = 'flex';
        document.querySelector('.buscador').style.cursor = 'pointer';
        document.querySelector('.buscador').style.opacity = 1;
    }, 400);
}

// ocultar los submenus
// NO OCURRE HASTA Q TERMINA LA ANIMACION DEL MENU PRINCIPAL
function ocultar(){
    setTimeout( () => {
        document.querySelector('.home').style.cursor = 'default';
        document.querySelector('.home').style.opacity = 0;
    }, 400);
    setTimeout( () => {
        document.querySelector('.ajustes').style.cursor = 'default';
        document.querySelector('.ajustes').style.opacity = 0;
    }, 300);
    setTimeout( () => {
        document.querySelector('.buscador').style.cursor = 'default';
        document.querySelector('.buscador').style.opacity = 0;
    }, 200);
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

function resultadosBusqueda(){
    box_search.style.display = 'block';
}

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
function paginaHome(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/'); //window.location = "pantallaJuegos.html";
}
function paginaAjustes() {
    if (block) document.location.assign('http://127.0.0.1:5000/Perfil_de_usuario/');
}
function cartas(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_cartas/Carta_mas_alta/?');
}
function blackJack(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_cartas/Blackjack/?');
}
function poker(){
    if(block) document.location.assign('hhttp://127.0.0.1:5000/Juegos/Indice_cartas/Poker/?');
}
function craps(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Indice_Dados/Craps/?');
}
function ruleta(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Ruleta/?');
}
function tragaperras(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Slots');
}
function plinko(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Plinko');
}
function kongoRun(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/KonguitoRun');
}
function bingo(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Juegos_extra/Bingo');
}
function eventos(){
    if(block) document.location.assign('http://127.0.0.1:5000/Juegos/Eventos/?');
}

// ir a ingresar dinero
function ingresarDinero(){
    window.location.href = "/dinero/";
}

// eventos de teclado
function teclaPresionada(){
    tecla = event.keyCode;

    if(tecla === 27){
        return cerrarBuscador();
    }
    else if(tecla === 13){
        if(miBusqueda ===  'HOME') paginaHome();
        else if(miBusqueda === 'PERFIL') paginaAjustes();
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

window.onkeydown = teclaPresionada;
