document.addEventListener('DOMContentLoaded', function () {
    const items = [
        '🍭', '❌', '⛄️', "😒", "🤡", "🎁", "🤑"
    ];
    const posicionamiento = document.querySelectorAll('.slot');
    const balanceElement = document.querySelector('#balance');
    const prizeElement = document.querySelector('#prize');
    const spinnerButton = document.querySelector('#spinner');
    spinnerButton.addEventListener('click', spin);

    // Agregamos una variable para controlar si se está realizando una animación
    let animacionEnProgreso = false;
    let spinEnProgreso = false;

    // Inicializamos el juego
    function init(firstInit = true, groups = 1, duration = 1) {


        for (const slot of posicionamiento) {
            if (firstInit) {
                slot.dataset.spinned = '0';
            }

            const boxes = slot.querySelector('.boxes');
            const boxesClone = boxes.cloneNode(false);
            const pool = ['❓'];

            if (!firstInit) {
                const arr = [];
                for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                    arr.push(...items);
                }
                pool.push(...shuffle(arr));
                boxesClone.addEventListener(
                    'transitionstart',
                    function () {
                        slot.dataset.spinned = '1';
                        this.querySelectorAll('.symbol').forEach((symbol) => {
                            symbol.style.filter = 'blur(1px)';
                        });
                    },
                    {once: true}
                );

                boxesClone.addEventListener(
                    'transitionend',
                    function () {
                        this.querySelectorAll('.symbol').forEach((symbol, index) => {
                            symbol.style.filter = 'blur(0)';
                            if (index > 0) this.removeChild(symbol);
                        });
                        slot.dataset.spinned = '0'; // Restablece el estado de la animación
                        animacionEnProgreso = false; // La animación ha terminado
                        spinnerButton.removeAttribute('disabled'); // Habilitamos el botón "Play" nuevamente
                    },
                    {once: true}
                );
            }

            for (let i = pool.length - 1; i >= 0; i--) {
                const symbol = document.createElement('div');
                symbol.classList.add('symbol');
                symbol.style.width = slot.clientWidth + 'px';
                symbol.style.height = slot.clientHeight + 'px';
                symbol.textContent = pool[i];
                boxesClone.appendChild(symbol);
            }
            boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
            boxesClone.style.transform = `translateY(-${slot.clientHeight * (pool.length - 1)}px)`;
            slot.replaceChild(boxesClone, boxes);
        }

        let animacionEnProgreso = false;
    }

    async function spin() {
        // Si la animación está en progreso, no hacemos nada
        if (animacionEnProgreso) return;
        // Si el balance es menor o igual a 0, no hacemos nada
        if (parseInt(balanceElement.textContent) <= 0) return;
        // Si el balance es menor a la apuesta, no hacemos nada
        if (parseInt(balanceElement.textContent) < parseInt(document.querySelector('#bet').value)) return;
        // Si la apuesta es menor o igual a 0, no hacemos nada
        if (parseInt(document.querySelector('#bet').value) <= 0) return;
        //No permitimos meter letras y simbolos en el input
        if (isNaN(document.querySelector('#bet').value)) return;
        // Si el balance es menor a la apuesta, no hacemos nada
        if (parseInt(balanceElement.textContent) < parseInt(document.querySelector('#bet').value)) return;


        // Bloqueo de Play
        spinnerButton.setAttribute('disabled', 'disabled');
        if (animacionEnProgreso || spinEnProgreso) {
            alert('Ya se está realizando una animación');
            return;
        }
        animacionEnProgreso = true;

        // Restamos la apuesta al balance
        const apuesta = parseInt(document.querySelector('#bet').value);
        const balanceActual = parseInt(balanceElement.textContent);
        const nuevoBalance = balanceActual - apuesta;
        balanceElement.textContent = nuevoBalance;
        init(false, 1, 2);

        for (const slot of posicionamiento) { //Este for es para que se muevan los slots
            const boxes = slot.querySelector('.boxes');
            const duration = parseInt(boxes.style.transitionDuration);
            boxes.style.transform = 'translateY(0)';
            await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }

        //espero a que termine la animacion
        await new Promise((resolve) => setTimeout(resolve, 2000));

        //Verifico si hay ganancia
        verificarGanancia()

        //Desbloqueo de Play
        animacionEnProgreso = false;
        spinnerButton.removeAttribute('disabled');
    }

    //Funcion para desordenar los items (animacion de los slots)
    function shuffle([...arr]) {
        let m = arr.length;
        const pool = [];

        // Define las probabilidades de aparición de cada símbolo
        const probabilidades = {
            '🍭': 0.3,
            '🤡': 0.25,
            '❌': 0.20,
            '⛄️': 0.1,
            '😒': 0.09,
            "🎁": 0.05,
            "🤑": 0.01
        };

        // Calcula el número de veces que se debe agregar cada símbolo
        for (const symbol of arr) {
            const probability = probabilidades[symbol];
            const numTimesToAdd = Math.ceil(100 * probability); // Redondea hacia arriba
            for (let i = 0; i < numTimesToAdd; i++) {
                pool.push(symbol);
            }
        }

        // Mezcla la lista pool de manera aleatoria
        while (pool.length) {
            const i = Math.floor(Math.random() * pool.length);
            const symbol = pool.splice(i, 1)[0];
            arr.push(symbol);
        }

        return arr;
    }


    function verificarGanancia() {
        //Obtiene los valores de los slots
        const slot1 = posicionamiento[0].querySelector('.symbol').textContent;
        const slot2 = posicionamiento[1].querySelector('.symbol').textContent;
        const slot3 = posicionamiento[2].querySelector('.symbol').textContent;

        // si los tres slots son iguales
        if (slot1 === '🍭' && slot2 === '🍭' && slot3 === '🍭') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 5);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 5 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🤡' && slot2 === '🤡' && slot3 === '🤡') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 7);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 7 + parseInt(prizeElement.textContent);
        } else if (slot1 === '❌' && slot2 === '❌' && slot3 === '❌') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 10);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 10 + parseInt(prizeElement.textContent);
        } else if (slot1 === '️⛄️' && slot2 === '⛄️' && slot3 === '⛄️') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 15);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 15 + parseInt(prizeElement.textContent);
        } else if (slot1 === '😒' && slot2 === '😒' && slot3 === '😒') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 30);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 30 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🎁' && slot2 === '🎁' && slot3 === '🎁') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 200);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 200 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🤑' && slot2 === '🤑' && slot3 === '🤑') { //Mulptiplica por 100 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 1000);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 1000 + parseInt(prizeElement.textContent);
        }

        // SI HAY DOS IGUALES
        else if (slot1 === '🍭' && slot2 === '🍭' || slot2 === '🍭' && slot3 === '🍭' || slot1 === '🍭' && slot3 === '🍭') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 1.5);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 1.5 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🤡' && slot2 === '🤡' || slot2 === '🤡' && slot3 === '🤡' || slot1 === '🤡' && slot3 === '🤡') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 2);
            prizeElement.textContent = apuesta * 2 + parseInt(prizeElement.textContent);
        } else if (slot1 === '❌' && slot2 === '❌' || slot2 === '❌' && slot3 === '❌' || slot1 === '❌' && slot3 === '❌') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 2.5);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 2.5 + parseInt(prizeElement.textContent);
        } else if (slot1 === '️⛄️' && slot2 === '⛄️' || slot2 === '⛄️' && slot3 === '⛄️' || slot1 === '⛄️' && slot3 === '⛄️') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 4);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 4 + parseInt(prizeElement.textContent);
        } else if (slot1 === '😒' && slot2 === '😒' || slot2 === '😒' && slot3 === '😒' || slot1 === '😒' && slot3 === '😒') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 5);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 5 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🎁' && slot2 === '🎁' || slot2 === '🎁' && slot3 === '🎁' || slot1 === '🎁' && slot3 === '🎁') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 7);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 7 + parseInt(prizeElement.textContent);
        } else if (slot1 === '🤑' && slot2 === '🤑' || slot2 === '🤑' && slot3 === '🤑' || slot1 === '🤑' && slot3 === '🤑') {
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 10);
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = apuesta * 10 + parseInt(prizeElement.textContent);
        }
        else {
        }
    }

    init();
});