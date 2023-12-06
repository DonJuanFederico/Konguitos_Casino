// Variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = true;
let dealerHiddenCard = true;

let balance = parseFloat(document.getElementById('monedas').textContent);
let betAmount;


function updateBalance() {
    document.getElementById("monedas").textContent = `${balance}`;
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value} of ${suit}`);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand) {
    const card = deck.pop();
    hand.push(card);

    const cardElement = document.createElement('img');
    const cardFileName = card.replace(/ /g, '') + '.png'; // Obtener el nombre del archivo de la carta
    cardElement.src = `/static/images/cards/${cardFileName}`; // Establecer la ruta de la imagen

    cardElement.classList.add('card-image'); // Agregar una clase para dar estilo a la imagen si es necesario

    const container = hand === playerHand ? 'player-hand' : 'dealer-hand';
    document.getElementById(container).appendChild(cardElement);

    updateUI();
}

function calculateHandValue(hand) {
    let value = 0;
    let hasAce = false;
    for (const card of hand) {
        const cardValue = card.split(' ')[0];
        if (cardValue === 'A') {
            hasAce = true;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(cardValue)) {
            value += 10;
        } else {
            value += parseInt(cardValue);
        }
    }
    if (hasAce && value > 21) {
        value -= 10;
    }
    return value;
}

function updateUI() {
    const playerHandContainer = document.getElementById('player-hand');
    const dealerHandContainer = document.getElementById('dealer-hand');

    // Limpiar los contenedores de las manos
    playerHandContainer.innerHTML = '';
    dealerHandContainer.innerHTML = '';

    // Mostrar las imágenes de la mano del jugador
    playerHand.forEach(card => {
        const cardElement = document.createElement('img');
        const cardFileName = card.replace(/ /g, '') + '.png';
        cardElement.src = `/static/images/cards/${cardFileName}`;
        cardElement.classList.add('card-image');
        playerHandContainer.appendChild(cardElement);
    });

    // Mostrar la mano de la banca, con la carta oculta si es necesario
    dealerHand.forEach((card, index) => {
        const cardElement = document.createElement('img');
        let cardFileName;

        if (index === 1 && !gameOver && dealerHiddenCard) {
            cardFileName = 'reverse.jpg'; // Nombre de archivo de la carta oculta
        } else {
            cardFileName = card.replace(/ /g, '') + '.png';
        }

        cardElement.src = `/static/images/cards/${cardFileName}`;
        cardElement.classList.add('card-image');
        dealerHandContainer.appendChild(cardElement);
    });

    // Mostrar el valor numérico de las manos
    document.getElementById('player-hand-value').textContent = calculateHandValue(playerHand);

    if (gameOver || !dealerHiddenCard) {
        document.getElementById('dealer-hand-value').classList.remove('hidden');
        document.getElementById('dealer-hand-value').textContent = calculateHandValue(dealerHand);

    } else {
        document.getElementById('dealer-hand-value').classList.add('hidden');
    }

}


function checkResult() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
        document.getElementById('result').textContent = 'Te pasaste de 21. Has perdido';
        dealerHiddenCard = false;
        updateUI();
        gameOver = true;

    } else if (dealerValue > 21) {
        document.getElementById('result').textContent = 'La banca se pasa de 21. Ganaste';
        dealerHiddenCard = false;
        updateUI();
        gameOver = true;
        agregarDinero(betAmount * 2); // Agregar dinero en caso de ganancia
    } else if (!gameOver) {
        if (playerValue > dealerValue) {
            document.getElementById('result').textContent = 'Has ganado';
            gameOver = true;
            agregarDinero(betAmount * 2); // Agregar dinero en caso de ganancia
        } else if (playerValue < dealerValue) {
            document.getElementById('result').textContent = 'Has perdido';
            gameOver = true;

        } else {
            document.getElementById('result').textContent = 'Empate';
            gameOver = true;
            agregarDinero(betAmount)
        }
    }
    updateBalance();
}


function betEnded() {
    betAmount = 0;
    updateBalance();
}

function newGame() {

    const betInput = document.getElementById('apuesta');
    betAmount = parseFloat(betInput.value);

    // Validar si la apuesta es válida (por ejemplo, si es mayor que cero)
    if (betAmount <= 0 || isNaN(betAmount)) {
        gameOver = true;
        alert('Ingresa una cantidad válida para apostar.');

        return; // Evitar iniciar el juego si la apuesta no es válida
    } else {
        startGame(); // Iniciar el juego si la apuesta es válida
    }

}

function startGame(){
    retirarDinero(betAmount);

    deck = [];
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    dealerHiddenCard = true;
    document.getElementById('result').textContent = '';
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';
    createDeck();
    shuffleDeck();
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    updateUI();
}

// Event listeners
document.getElementById('deal-button').addEventListener('click', () => {
    if (gameOver) {
        newGame();
    }
});

document.getElementById('hit-button').addEventListener('click', () => {
    if (!gameOver) {
        dealCard(playerHand);
        const playerValue = calculateHandValue(playerHand);
        if (playerValue > 21) {
            gameOver = true;
            checkResult();
        }
    }
});

document.getElementById('stand-button').addEventListener('click', () => {
    if (!gameOver) {
        dealerHiddenCard = false;
        updateUI();
        while (calculateHandValue(dealerHand) < 17) {
            dealCard(dealerHand);
        }
        checkResult();
    }
});

document.getElementById("masMonedas").addEventListener("click", function () {
        window.location.href = "/dinero/";
});

function agregarDinero(monto) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_ganancias", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Verificar la respuesta del servidor y actualizar el saldo en el cliente si es necesario
            if (xhr.status === 200) {
                balance += monto;
                updateBalance(); // Actualizar la visualización del saldo en la interfaz
            } else {
                // Manejar errores si la solicitud al servidor falla
                console.error('Error al agregar dinero.');
            }
        }
    };
}

function retirarDinero(monto) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Verificar la respuesta del servidor y actualizar el saldo en el cliente si es necesario
            if (xhr.status === 200) {
                balance -= monto;
                updateBalance(); // Actualizar la visualización del saldo en la interfaz
            } else {
                // Manejar errores si la solicitud al servidor falla
                console.error('Error al retirar dinero.');
            }
        }
    };
}

// boton de la toolbar de marcha atras
var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.href = '/Juegos/Indice_cartas';}


