document.addEventListener('DOMContentLoaded', function () {
    const items = [
        '🍭', '❌', '⛄️', "😒", "🤡", "🤖", "👽", "👾", "👻", "👺", "👹"
    ];
    const posicionamiento = document.querySelectorAll('.slot');
    const balanceElement = document.querySelector('#balance');
    const prizeElement = document.querySelector('#prize');
    let contador = 0;
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
        let spinEnProgreso = false;
    }

    async function spin() {
        // Si la animación está en progreso, no hacemos nada
        if (animacionEnProgreso) return;
        // Si el spin está en progreso, no hacemos nada
        if (spinEnProgreso) return;
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


        // Deshabilitamos el botón "Play" para evitar que se presione mientras se está realizando la animación
        spinnerButton.setAttribute('disabled', 'disabled');
        // Bloqueamos el botón "Play" si ya se está realizando una animación
        if (animacionEnProgreso || spinEnProgreso) {
            alert('Ya se está realizando una animación');
            return;
        }
        animacionEnProgreso = true;
        spinEnProgreso = true;

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
        //espero a que termine la animacion
        verificarGanancia()
        // La animación ha terminado, desbloqueamos el botón "Play"
        animacionEnProgreso = false;
        spinnerButton.removeAttribute('disabled');
        spinEnProgreso = false;
    }

    function shuffle([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }

    function verificarGanancia() {
        //Enseñame que hay en el primer slot
        const slot1 = posicionamiento[0].querySelector('.symbol').textContent;
        //Enseñame que hay en el segundo slot
        const slot2 = posicionamiento[1].querySelector('.symbol').textContent;
        //Enseñame que hay en el tercer slot
        const slot3 = posicionamiento[2].querySelector('.symbol').textContent;

        //Imprime en consola los valores de los slots
        console.log(slot1, slot2, slot3);

        //Si los tres slots son iguales
        if (slot1 === slot2 && slot2 === slot3) {
            //Mulptiplica por 10 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 10);
            balanceElement.textContent = nuevoBalance;
            //Actualiza el premio
            prizeElement.textContent = apuesta * 10 + parseInt(prizeElement.textContent);
            //Imprime en consola el balance
            console.log(nuevoBalance);
        }
        //Si dos slots son iguales
        else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            //Mulptiplica por 5 los aposstado y lo suma al balance
            const apuesta = parseInt(document.querySelector('#bet').value);
            const balanceActual = parseInt(balanceElement.textContent);
            const nuevoBalance = balanceActual + (apuesta * 5);
            balanceElement.textContent = nuevoBalance;
            //Actualiza el premio
            prizeElement.textContent = apuesta * 5 + parseInt(prizeElement.textContent);
            //Imprime en consola el balance
            console.log(nuevoBalance);
        }
        //Si no hay ningun slot igual
        else {
            //Imprime en consola el balance
            console.log(balanceElement.textContent);
        }
    }

    init();
});