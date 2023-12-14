let dadosBloqueados = {
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false
};

let valoresDados = [0, 0, 0, 0, 0];
let numeroTiros = 3;

function toggleBloquearDado(dadoId) {
    const dadoImg = document.getElementById(dadoId);

    if (numeroTiros < 3) {
        dadosBloqueados[dadoId] = !dadosBloqueados[dadoId];

        if (dadosBloqueados[dadoId]) {
            dadoImg.style.border = '2px solid red'; // Cambiar borde a rojo cuando está bloqueado
        } else {
            dadoImg.style.border = 'none'; // Quitar borde cuando se desbloquea
        }
    } else {
        alert('No puedes bloquear dados antes de comenzar la partida.');
    }
}

function lanzarDados() {
    const betInput = document.getElementById('apuesta');
    betAmount = parseFloat(betInput.value);

    const botonLanzar = document.querySelector('.lanzar-button');

    // Validar si la apuesta es válida (por ejemplo, si es mayor que cero)
    if (betAmount <= 0 || isNaN(betAmount)) {
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
        numeroTiros = numeroTiros -1;
        document.getElementById("result").textContent = `Mano actual: ${resultado}`;
        document.getElementById("throws").textContent = `Tiradas restantes: ${numeroTiros}`;

        if (numeroTiros === 0) {
            botonLanzar.disabled = true;
            setTimeout(() => {
                alert(`Tu resultado final es: ${resultado}`);
                resetGame();
                botonLanzar.disabled = false;
            }, 1000);
        }
    }
}

function calcularResultado(valoresDados) {
    const frecuencias = {};
    for (const valor of valoresDados) {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
    }


    const valoresFrecuentes = Object.values(frecuencias);
    const numValoresUnicos = Object.keys(frecuencias).length;

    const esMayor = esEscaleraMayor(valoresDados);
    console.log(esMayor);
    const esMenor = esEscaleraMenor(valoresDados);

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
    } else if (esMayor) {
        return 'Escalera Mayor'; // Escalera mayor (6-5-4-3-2)
    } else if (esMenor) {
        return 'Escalera Menor'; // Escalera menor (5-4-3-2-1)
    } else {
        return 'Nada'; // Ninguna combinación especial
    }
}

function esEscaleraMayor(valoresDados) {
    console.log(valoresDados);
    const escaleraMayor = [2, 3, 4, 5, 6];
    const valoresOrdenados = [...valoresDados].sort((a, b) => a - b);
    console.log(valoresOrdenados);
    return JSON.stringify(valoresOrdenados) === JSON.stringify(escaleraMayor);
}

function esEscaleraMenor(valoresDados) {
    const escaleraMenor = [1, 2, 3, 4, 5];
    const valoresOrdenados = [...valoresDados].sort((a, b) => a - b);
    return JSON.stringify(valoresOrdenados) === JSON.stringify(escaleraMenor);
}

function resetGame(){
    // Desbloquear todos los dados
    for (let i = 1; i <= 5; i++) {
        const dadoId = `dice${i}`;
        dadosBloqueados[dadoId] = false;
        const dadoImg = document.getElementById(dadoId);
        dadoImg.style.border = 'none';
    }

    // Cambiar la imagen de cada dado a la por defecto
    for (let i = 1; i <= 5; i++) {
        const dadoId = `dice${i}`;
        document.getElementById(dadoId).src = `/static/images/dados/0.png`;
    }

    // Reiniciar el contador de tiradas y mostrar el número de tiradas restantes
    numeroTiros = 3;
    document.getElementById("throws").textContent = `Tiradas restantes: ${numeroTiros}`;
    document.getElementById("result").textContent = `Mano actual: Ninguna`;

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