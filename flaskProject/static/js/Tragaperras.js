const items = [
    '🍭', '❌', '⛄️', "😒", "🤡", "🎁", "🤑", "💀", "🙏", "🎅", "🧙"
];

//SLOTS
const posicionamiento = document.querySelectorAll('.slot');

//RECUADRO DE SALDO DE CLIENTE
let monedasUsuarioElement = document.querySelector('#monedasUsuario');

//RECUADRO DE GANADO
const prizeElement = document.querySelector('#prize');

//BOTON DE SPIN
const spinnerButton = document.querySelector('#spinner');
//BOTON DE SPIN donde clickas y se ejecuta la funcion spin
spinnerButton.addEventListener('click', spin);

// Agregamos una variable para controlar si se está realizando una animación
let animacionEnProgreso = false;

// Inicializamos el juego
function init(firstInit = true, groups = 1, duration = 1) {

    for (const slot of posicionamiento) {
        if (firstInit) {
            // Establecer el atributo "spinned" en "0" al inicializar
            slot.dataset.spinned = '0';
        }

        const boxes = slot.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['❓'];

        if (!firstInit) {
            // Crear un arreglo con los símbolos a mostrar
            const arr = [];
            for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                arr.push(...items);
            }
            pool.push(...shuffle(arr));

            // Agregar eventos de inicio y final de transición
            boxesClone.addEventListener('transitionstart', function () {
                // Iniciar la animación y desenfocar los símbolos
                slot.dataset.spinned = '1';
                this.querySelectorAll('.symbol').forEach((symbol) => {
                    symbol.style.filter = 'blur(1px)';
                });
            }, {once: true});

            boxesClone.addEventListener('transitionend', function () {
                // Restablecer el enfoque de los símbolos y terminar la animación
                this.querySelectorAll('.symbol').forEach((symbol, index) => {
                    symbol.style.filter = 'blur(0)';
                    if (index > 0) this.removeChild(symbol);
                });
                slot.dataset.spinned = '0'; // Restablecer el estado de la animación
                animacionEnProgreso = false; // La animación ha terminado
                spinnerButton.removeAttribute('disabled'); // Habilitar el botón "Play" nuevamente
            }, {once: true});
        }

        // Crear símbolos y agregarlos a la caja clonada
        // La caja clonada se usa para que la animación se pueda repetir
        for (let i = pool.length - 1; i >= 0; i--) {
            const symbol = document.createElement('div');
            symbol.classList.add('symbol');
            symbol.style.width = slot.clientWidth + 'px';
            symbol.style.height = slot.clientHeight + 'px';
            symbol.textContent = pool[i];
            boxesClone.appendChild(symbol);
        }

        // Configurar duración de la animación y transformación
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${slot.clientHeight * (pool.length - 1)}px)`;

        // Reemplazar las cajas originales con las clonadas
        slot.replaceChild(boxesClone, boxes);
    }

    let animacionEnProgreso = false;

}

//Función al darle al spin
async function spin() {
    // Si la animación está en progreso, no hacemos nada
    if (animacionEnProgreso) return;
    // Bloqueo de Play
    spinnerButton.setAttribute('disabled', 'disabled');
    animacionEnProgreso = true;

    FuncionDeApuesta();

    init(false, 1, 2);

    //Este for es para que se muevan los slots de arriba a abajo (no es lo mismo que el shuffle)
    for (const slot of posicionamiento) {
        const boxes = slot.querySelector('.boxes');
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = 'translateY(0)';
        await new Promise((resolve) => setTimeout(resolve, duration * 50));
    }

    //cambiar la imagen de konguito
    for (let i = 1; i <= 5; i++) {
        let imagen = document.getElementById('KonguitoTragaperras');
        imagen.src = `/static/images/tragaperras/${i}def.png`;
        // Esperar un tiempo antes de cambiar la imagen
        await new Promise((resolve) => setTimeout(resolve, 150)); // Cambia el valor de 500 a la cantidad de milisegundos que desees
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    //Verifico si hay ganancia
    verificarGanancia()

    //Desbloqueo de Play
    animacionEnProgreso = false;
    spinnerButton.removeAttribute('disabled');
}

function FuncionDeApuesta() {
    //Funcion para restar el dinero de la apuesta
    apuesta = parseFloat(document.querySelector('#bet').value);

    let balanceActual = parseFloat(monedasUsuarioElement.textContent);
    //Aqui se comprueba si el usuario tiene suficiente dinero para apostar
    if (apuesta <= 0) {
        alert('Tiene que apostar una cantidad mínima de 0.01 Konguito Coin.');
        return;
    } else if (apuesta > balanceActual) {
        alert('No tienes suficiente saldo para esta apuesta.');
        return;
    }

    //Aqui se resta el dinero de la apuesta al saldo del cliente en la pagina
    monedasUsuarioElement.textContent = monedasUsuarioElement.textContent - apuesta
    console.log("Apuesta: " + apuesta);

    //Aqui funcion para actualizar la base de datos con el nuevo saldo del cliente
    retirarDinero()
    console.log("Balance actual: " + balanceActual + " - " + apuesta + " = " + (balanceActual - apuesta));
}

//Funcion para desordenar los items (animacion de los slots)
function shuffle([...arr]) {
    let m = arr.length;
    const pool = [];

    // Define las probabilidades de aparición de cada símbolo
    const probabilidades = {
        '🍭': 0.2,
        "🙏": 0.1,
        "🎅": 0.1,
        "🧙": 0.1,
        '🤡': 0.1,
        '❌': 0.1,
        '⛄️': 0.1,
        '😒': 0.1,
        "🎁": 0.05,
        "🤑": 0.04,
        "💀": 0.01
    };

    // Calcula el número de veces que se debe agregar cada símbolo
    for (const symbol of arr) {
        const probability = probabilidades[symbol];
        const numTimesToAdd = Math.ceil(100 * probability); // Redondea hacia arriba
        for (let i = 0; i < numTimesToAdd; i++) {
            pool.push(symbol);
        }
    }

    // Mezcla la lista de simbolos
    while (pool.length) {
        const i = Math.floor(Math.random() * pool.length);
        const symbol = pool.splice(i, 1)[0];
        arr.push(symbol);
    }

    return arr;
}

//Funcion para verificar si hay ganancia
function verificarGanancia() {
    //ver lo que ha tocado en cada slot
    const slotValues = [
        posicionamiento[0].querySelector('.symbol').textContent,
        posicionamiento[1].querySelector('.symbol').textContent,
        posicionamiento[2].querySelector('.symbol').textContent,
    ];

    const apuesta = parseInt(document.querySelector('#bet').value);
    let balanceActual = parseInt(monedasUsuarioElement.textContent);

    // tres es el multiplicador de la apuesta introducida cuando salen 3 iguales
    // dos es el multiplicador de la apuesta introducida cuando salen 2 iguales
    // symbol es el simbolo que se ha repetido
    const premios = {
        '🍭': {tres: 5, dos: 1.5},
        '🤡': {tres: 7, dos: 2},
        '❌': {tres: 7, dos: 2},
        '️⛄️': {tres: 7, dos: 2},
        '😒': {tres: 7, dos: 2},
        '🙏': {tres: 7, dos: 2},
        '🎅': {tres: 7, dos: 3},
        '🧙': {tres: 7, dos: 3},
        '🎁': {tres: 50, dos: 5},
        '🤑': {tres: 100, dos: 10},
        '💀': {tres: 1000, dos: 100}
    };

    let premio = 0;
    prizeElement.textContent = premio;

    // Comprobar si hay tres símbolos iguales
    for (const symbol in premios) {
        if (slotValues.every(value => value === symbol)) {
            premio = apuesta * premios[symbol].tres;
            prizeElement.textContent = premio;
            break;
        }
    }

    // Comprobar si hay dos símbolos iguales
    const symbolsSet = new Set(slotValues);
    for (const symbol of symbolsSet) {
        if (slotValues.filter(value => value === symbol).length === 2) {
            premio = apuesta * premios[symbol].dos;
            prizeElement.textContent = premio;
            break;
        }
    }
    //METODO DE ACTUALIZAR EL BALANCE
    if (premio > 0) {
        //ACTUALIZAMOS EL SALDO DEL CLIENTE EN LA BASE DE DATOS Y EN LA PAGINA
        let balanceActual = parseFloat(monedasUsuarioElement.textContent);
        console.log("Premio: " + premio)
        console.log("Balance actual: " + balanceActual + " + " + premio + " = " + (balanceActual + premio));
        //PAGINA:
        monedasUsuarioElement.textContent = Math.round((parseFloat(monedasUsuarioElement.textContent) + parseFloat(premio)) * 100) / 100;
        //BASE DE DATOS:
        agregarDinero()
    }
}


//Te redirige a la pagina de comprar monedas
document.getElementById("botonComprarMonedas").addEventListener("click", function () {
    window.location.href = "/dinero/";
});

function retirarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LA APUESTA
    var monto = apuesta;
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/retirar_dinero", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_retirar=" + monto);
}

function agregarDinero() {
    // MONTO EN ESTE CASO ES VALOR DE LO GANADO (MIRAR TRAGAPERRAS PARA VERLO BIEN)
    var monto = parseInt(prizeElement.textContent);
    // Enviar solicitud HTTP a tu servidor Flask
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/agregar_ganancias", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("&cantidad_a_agregar=" + monto);
}
// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;
function volverAtras(){
    if(prevUrl.indexOf(window.location.host) !== -1) {
    // Ir a la página anterior
    window.history.back();
    }
}

init()

