
let dadosBloqueados = {
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false
};

let valoresDados = [0, 0, 0, 0, 0];

function toggleBloquearDado(dadoId) {
    const dadoImg = document.getElementById(dadoId);
    dadosBloqueados[dadoId] = !dadosBloqueados[dadoId];

    if (dadosBloqueados[dadoId]) {
        dadoImg.style.border = '2px solid red'; // Cambiar borde a rojo cuando está bloqueado
    } else {
        dadoImg.style.border = 'none'; // Quitar borde cuando se desbloquea
    }
}

function lanzarDados() {
    const betInput = document.getElementById('apuesta');
    betAmount = parseFloat(betInput.value);

    // Validar si la apuesta es válida (por ejemplo, si es mayor que cero)
    if (betAmount <= 0 || isNaN(betAmount)) {
        gameOver = true;
        alert('Ingresa una cantidad válida para apostar.');

        return; // Evitar iniciar el juego si la apuesta no es válida
    } else {

        const dadosNoBloqueados = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];

        for (let i = 0; i < dadosNoBloqueados.length; i++) {
            const dadoId = dadosNoBloqueados[i];
            if (!dadosBloqueados[dadoId]) {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                document.getElementById(dadoId).src = `/static/images/dados/${randomNumber}.png`;

                // Actualizar valoresDados con los valores aleatorios obtenidos para cada dado
                const dadoNumero = parseInt(dadoId.slice(-1)) - 1; // Obtener el número del dado del ID
                valoresDados[dadoNumero] = randomNumber;
            }
        }

        const resultado = calcularResultado(valoresDados);
        document.getElementById("result").textContent = `Mano actual: ${resultado}`;
    }
}

function calcularResultado(valoresDados) {
    const frecuencias = {};
    for (const valor of valoresDados) {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
    }

    const valoresFrecuentes = Object.values(frecuencias);
    const numValoresUnicos = Object.keys(frecuencias).length;

    if (valoresFrecuentes.includes(5)) {
        return 'Repóker'; // 5 dados con el mismo valor
    } else if (valoresFrecuentes.includes(4)) {
        return 'Póker'; // 4 dados con el mismo valor
    } else if (valoresFrecuentes.includes(3) && valoresFrecuentes.includes(2)) {
        return 'Full'; // Trío y pareja
    } else if (valoresFrecuentes.includes(3)) {
        return 'Trío'; // 3 dados con el mismo valor
    } else if (valoresFrecuentes.includes(2) && numValoresUnicos === 3) {
        return 'Doble Pareja'; // Dos parejas
    } else if (valoresFrecuentes.includes(2)) {
        return 'Pareja'; // 2 dados con el mismo valor
    } else {
        return 'Nada'; // Ninguna combinación especial
    }
}




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
function volverAtras(){document.location.href = '/Juegos/Indice_Dados';}