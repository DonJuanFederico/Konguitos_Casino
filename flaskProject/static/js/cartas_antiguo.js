var deck = document.getElementById('deck');
var slots = document.querySelectorAll('.slot');
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

let bloqueo = true;

// IMPORTANTE: LA CARTA Nº 1 ES LA DEL DEALER
for (let i = 1; i < slots.length; i++) {
    slots[i].addEventListener('click', () => {
        if (!bloqueo) {
            bloqueo = true;

            slots[i].style.backgroundColor = 'rebeccapurple';
            /* cambiar los estilos de los diferentes metodos y comprobar si se cambia de color */
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
                    // revealAllCards(); // Revelar todas las cartas después de 1 segundo
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
    messageDiv.textContent = message

    //apostar
    apuesta = parseFloat(document.getElementById('apuesta').value);
    // Realiza la apuesta
        if (saldo > 0 && apuesta <= saldo) {
            let gananciaPerdida = apuesta;
            if (messageDiv.textContent === '¡¡¡KONGUITO GANADOORRRR!!!') {
                saldo += 2 * apuesta;
                agregarDinero();
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

var botonReglas = document.getElementById("botonReglas");
    botonReglas.addEventListener("click", function () {
        Swal.fire({
            title: '¡BIENVENIDO!',
            width: 600,
            height: 700,
            html: "<div>" +
                " <strong><h3 style='text-decoration: underline; text-align: center' >REGLAS:</h3></strong>" +
                "<br><strong>1.</strong> Se reparten 4 cartas boca abajo en total." +
                "<br><strong>2.</strong> De estas, 1 de ellas se le reparte a la banca y las otras 3 al jugador." +
                "<br><strong>3.</strong> Al jugador se le da la opción de elegir una de las 3 cartas que posee." +
                "<br><strong>4.</strong> Se desvela la carta del jugador y posteriormente la de la banca." +
                "<br><strong>5.</strong> Se comparan las cartas y la de mayor valor ganará." +
                "<br><strong>6.</strong> En caso de empate se perderá el 50% de la apuesta principal." +
                "</div>",
            confirmButtonText: '¡Dejame Jugar!',
            confirmButtonColor: 'darkgoldenrod',
            backdrop: `rgba(0,0,0,0.4)`,
            allowOutsideClick: true,
            allowEscapeKey: true,
            customClass: {
                confirmButton: 'custom-button',
                htmlContainer: 'custom-container'
              },
        });
    });

