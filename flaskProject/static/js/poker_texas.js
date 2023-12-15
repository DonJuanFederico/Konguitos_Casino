// Variables
let deck = [];
let playerHand = [];
let player2Hand = [];
let table = [];
let gameOver = true;
let hiddenCard = 3;

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

    const container = hand === playerHand ? 'player-hand' : 'player2-hand';
    document.getElementById(container).appendChild(cardElement);

    updateUI();
}

function calculateHandValue(hand) {
    const values = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    // Contadores para evaluar la mano
    const valueCount = {};
    const suitCount = {};

    // Inicializar contadores
    for (const card of hand) {
        const [value, suit] = card.split(' ');
        valueCount[value] = (valueCount[value] || 0) + 1;
        suitCount[suit] = (suitCount[suit] || 0) + 1;
    }

    // Función para verificar si hay una escalera
    const isStraight = () => {
        const sortedValues = Object.keys(valueCount).sort((a, b) => values[a] - values[b]);
        for (let i = 0; i < sortedValues.length - 1; i++) {
            if (values[sortedValues[i + 1]] - values[sortedValues[i]] !== 1) {
                return false;
            }
        }
        return true;
    };

    // Verificar combinaciones
    const valueKeys = Object.keys(valueCount);
    const numValues = valueKeys.length;

    if (numValues === 2) {
        // Four of a kind or Full House
        const counts = Object.values(valueCount);
        if (counts.includes(4)) {
            return 'Four of a Kind';
        } else {
            return 'Full House';
        }
    } else if (numValues === 3) {
        // Three of a Kind or Two Pair
        const counts = Object.values(valueCount);
        if (counts.includes(3)) {
            return 'Three of a Kind';
        } else {
            return 'Two Pair';
        }
    } else if (numValues === 4) {
        // One Pair
        return 'One Pair';
    } else {
        // Check for straight and flush
        const isFlush = Object.values(suitCount).some(count => count === 5);
        const straight = isStraight();

        if (isFlush && straight) {
            return 'Straight Flush';
        } else if (isFlush) {
            return 'Flush';
        } else if (straight) {
            return 'Straight';
        } else {
            return 'High Card';
        }
    }
}


function updateUI() {
    const playerHandContainer = document.getElementById('player-hand');
    console.log(`Mano jugador: ${playerHand}`);
    console.log(`Mano rival: ${player2Hand}`);
    console.log(`Mano mesa: ${table}`);
    const player2HandContainer = document.getElementById('player2-hand');
    const tableContainer = document.getElementById('table');

    // Limpiar los contenedores de las manos
    playerHandContainer.innerHTML = '';
    player2HandContainer.innerHTML = '';
    tableContainer.innerHTML = '';

    // Mostrar las imágenes de la mano del jugador
    playerHand.forEach(card => {
        const cardElement = document.createElement('img');
        const cardFileName = card.replace(/ /g, '') + '.png';
        cardElement.src = `/static/images/cards/${cardFileName}`;
        cardElement.classList.add('card-image');
        playerHandContainer.appendChild(cardElement);
    });

    //Mano del rival solo si terminó la partida
     // Mostrar la mano del rival solo si terminó la partida
    player2Hand.forEach(card => {
        const cardElement = document.createElement('img');
        let cardFileName;

        if (!gameOver) {
            cardFileName = 'reverse.jpg'; // Nombre de archivo de la carta oculta
        } else {
            cardFileName = card.replace(/ /g, '') + '.png';
        }

        cardElement.src = `/static/images/cards/${cardFileName}`;
        cardElement.classList.add('card-image');
        player2HandContainer.appendChild(cardElement);
    });

    for (let i = 0; i < table.length; i++) {
        const cardElement = document.createElement('img');
        const cardFileName = table[i].replace(/ /g, '') + '.png';

        if (i < hiddenCard) {
            cardElement.src = `/static/images/cards/${cardFileName}`; // Mostrar las dos primeras cartas
        } else if (i >= hiddenCard && i < 5) {
            cardElement.src = `/static/images/cards/reverse.jpg`; // Ocultar las siguientes tres cartas
        }

        cardElement.classList.add('card-image');
        tableContainer.appendChild(cardElement);
    }

}

//AHORA MISMO COMPARA LAS MANOS COMO SI FUERA BLACKJACK
function checkResult() {
    const playerValue = calculateHandValue(playerHand);
    const player2Value = calculateHandValue(player2Hand);

    if (playerValue > 21) {
        document.getElementById('result').textContent = 'Te pasaste de 21. Has perdido';
        hiddenCard = false;
        updateUI();
        gameOver = true;

    } else if (player2Value > 21) {
        document.getElementById('result').textContent = 'La banca se pasa de 21. Ganaste';
        hiddenCard = false;
        updateUI();
        gameOver = true;
        agregarDinero(betAmount * 2); // Agregar dinero en caso de ganancia
    } else if (!gameOver) {
        if (playerValue > player2Value) {
            document.getElementById('result').textContent = 'Has ganado';
            gameOver = true;
            agregarDinero(betAmount * 2); // Agregar dinero en caso de ganancia
        } else if (playerValue < player2Value) {
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
    player2Hand = [];
    table = [];
    gameOver = false;
    hiddenCard = 3;
    document.getElementById('result').textContent = '';
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('player2-hand').innerHTML = '';
    createDeck();
    shuffleDeck();
    dealCard(playerHand);
    dealCard(player2Hand);
    dealCard(playerHand);
    dealCard(player2Hand);
    dealCard(table);
    dealCard(table);
    updateUI();
}

// Event listeners
document.getElementById('start-button').addEventListener('click', () => {
    if (gameOver) {
        newGame();
    }
});

document.getElementById('deal-button').addEventListener('click', () => {

});

document.getElementById('bet-button').addEventListener('click', () => {
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
        hiddenCard = false;
        updateUI();
        while (calculateHandValue(player2Hand) < 17) {
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