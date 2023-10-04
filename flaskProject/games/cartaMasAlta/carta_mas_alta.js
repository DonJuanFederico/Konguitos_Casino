// Agregar el manejo de evento al botón
document.getElementById('iniciarJuego').addEventListener('click', function() {
    // Función para crear una baraja de cartas de poker
    function crearBaraja() {
        const palos = ['Picas', 'Corazones', 'Diamantes', 'Tréboles'];
        const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const baraja = [];

        for (const palo of palos) {
            for (const valor of valores) {
                baraja.push(`${valor} de ${palo}`);
            }
        }

        return baraja;
    }

    // Función para obtener una carta aleatoria de la baraja
    function obtenerCartaAleatoria(baraja) {
        const indice = Math.floor(Math.random() * baraja.length);
        return baraja.splice(indice, 1)[0];
    }

    // Función para comparar dos cartas por su valor
    function compararCartas(cartas) {
        const valorCartaUsuario = obtenerValorCarta(cartas.usuario);
        const valorCartaCroupier = obtenerValorCarta(cartas.croupier);

        if (valorCartaUsuario > valorCartaCroupier) {
            return '¡El usuario gana!';
        } else if (valorCartaUsuario < valorCartaCroupier) {
            return '¡El croupier gana!';
        } else {
            return 'Empate';
        }
    }

    // Función para obtener el valor numérico de una carta
    function obtenerValorCarta(carta) {
        const valor = carta.split(' ')[0];
        const valores = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
        return valores[valor];
    }

    const baraja = crearBaraja();
    const cartas = {
        usuario: [obtenerCartaAleatoria(baraja), obtenerCartaAleatoria(baraja), obtenerCartaAleatoria(baraja)],
        croupier: obtenerCartaAleatoria(baraja),
    };

    const cartaElegida = prompt(`Tus cartas son: ${cartas.usuario.join(', ')}. Elige una carta (1, 2 o 3):`);
    const cartaUsuario = cartas.usuario[cartaElegida - 1];
    const resultado = compararCartas({ usuario: cartaUsuario, croupier: cartas.croupier });

    document.getElementById('resultado').innerHTML = `Carta del croupier: ${cartas.croupier}<br>Tu carta: ${cartaUsuario}<br>Resultado: ${resultado}`;
});
