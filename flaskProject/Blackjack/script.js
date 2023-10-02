// Variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = true;
let dealerHiddenCard = true;

// Función para crear una nueva baraja
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value} of ${suit}`);
        }
    }
}

// Función para barajar la baraja
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Función para repartir una carta
function dealCard(hand) {
    const card = deck.pop();
    hand.push(card);

    // Mostrar la carta recién repartida
    const cardElement = document.createElement('span');
    cardElement.textContent = card;

    if (hand === playerHand) {
        document.getElementById('player-hand').appendChild(cardElement);
    } else {
        document.getElementById('dealer-hand').appendChild(cardElement);
    }

    // Actualizar el valor de la mano y la interfaz de usuario
    updateUI();
}

// Función para calcular el valor de una mano de cartas
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

// Función para actualizar la interfaz de usuario
function updateUI() {
    document.getElementById('player-hand').textContent = playerHand.join(', ');

    // Mostrar la segunda carta de la banca solo si el juego ha terminado
    if (gameOver) {
        document.getElementById('dealer-hand').textContent = dealerHand.join(', ');
    } else {
        // Mostrar solo la primera carta de la banca, ocultando la segunda
        document.getElementById('dealer-hand').textContent = dealerHand[0] + ', ???';
    }
    
    if (!dealerHiddenCard) {
        document.getElementById('dealer-hand').textContent = dealerHand.join(', ');
    }
}

// Función para comprobar el resultado del juego
// Función para comprobar el resultado del juego
function checkResult() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
        document.getElementById('result').textContent = 'Te pasaste de 21. Has perdido';
        // Revelar la segunda carta de la banca
        dealerHiddenCard = false;
        updateUI();
        gameOver = true;
    } else if (dealerValue > 21) {
        document.getElementById('result').textContent = 'La banca se pasa de 21. Ganaste';
        // Revelar la segunda carta de la banca
        dealerHiddenCard = false;
        updateUI();
        gameOver = true;
    } else if (!gameOver) {
        if (playerValue > dealerValue) {
            document.getElementById('result').textContent = 'Has ganado';
            gameOver = true;
        } else if (playerValue < dealerValue) {
            document.getElementById('result').textContent = 'Has perdido';
            gameOver = true;
        } else {
            document.getElementById('result').textContent = 'Empate';
            gameOver = true;
        }
    }
}


// Función para reiniciar el juego
function resetGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    dealerHiddenCard = true;
    document.getElementById('result').textContent = '';

    // Limpiar las cartas del jugador y la banca
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';

    // Crear una nueva baraja y barajarla
    createDeck();
    shuffleDeck();

    // Repartir dos cartas al jugador y una a la banca
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    // Actualizar la interfaz de usuario
    updateUI();
}


// Event listeners
document.getElementById('deal-button').addEventListener('click', () => {
    if (gameOver) {
        resetGame();
        gameOver = false;
    }
});

document.getElementById('hit-button').addEventListener('click', () => {
    if (!gameOver) {
        dealCard(playerHand);
        const playerValue = calculateHandValue(playerHand);
        if (playerValue > 21) {
            // Si el jugador supera 21, termina el juego
            gameOver = true;
            checkResult();
        }
    }
});

document.getElementById('stand-button').addEventListener('click', () => {
    if (!gameOver) {
        // Revelar la segunda carta de la banca
        dealerHiddenCard = false;

        // Actualizar la interfaz de usuario para mostrar la segunda carta de la banca
        updateUI();

        // Continuar repartiendo cartas a la banca si su valor es menor a 17
        while (calculateHandValue(dealerHand) < 17) {
            dealCard(dealerHand);
        }

        // Comprobar el resultado del juego
        checkResult();
    }
});



