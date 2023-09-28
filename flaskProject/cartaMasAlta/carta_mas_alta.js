// Definir una baraja de cartas
const deck = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Función para barajar el mazo
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Función para repartir una carta al jugador
function dealCard(playerHand) {
    if (deck.length === 0) {
        alert('Se agotaron las cartas. El juego se reiniciará.');
        resetGame();
        return;
    }

    const card = deck.pop(); // Tomar la última carta del mazo
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card;
    playerHand.appendChild(cardElement);
}

// Función para reiniciar el juego
function resetGame() {
    deck.length = 0;
    for (let i = 2; i <= 10; i++) {
        deck.push(i.toString());
    }
    deck.push('J', 'Q', 'K', 'A');
    shuffleDeck(deck);
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('dealer-hand').innerHTML = '';
}
document.getElementById('deal-button').addEventListener('click', () => {
    dealCard(document.getElementById('player-hand'));
    dealCard(document.getElementById('dealer-hand'));
});
