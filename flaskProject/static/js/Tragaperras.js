document.addEventListener('DOMContentLoaded', function (message) {
    const items = [
        '🍭', '❌', '⛄️', "😒", "🤡", "🎁", "🤑", "💀", "🙏", "🎅", "🧙"
    ];
    const posicionamiento = document.querySelectorAll('.slot');
    const balanceElement = document.querySelector('#balance');
    const prizeElement = document.querySelector('#prize');
    const spinnerButton = document.querySelector('#spinner');

    //BOTONES DE APUESTA
    spinnerButton.addEventListener('click', spin);

    // Agregamos una variable para controlar si se está realizando una animación
    let animacionEnProgreso = false;
    let spinEnProgreso = false;

    //Alerta de Reglas
    var botonReglas = document.getElementById("reglas");
    botonReglas.addEventListener("click", function () {
        Swal.fire({
            title: 'REGLAS',
            html: "<div style='text-align: center;'>" +
                " Bievenido al mejor tragaperras existente (No es para nada un timo)" +
                "<h3>REGLAS:</h3>" +
                "1. Para jugar, introduce la cantidad que quieres apostar." +
                "<br>2. Dale al Spin y GANA." +
                "<h5>Normas a tener en cuenta:</h5>" +
                "Si ganas, se te sumará el premio a tu balance." +
                "<br>Si pierdes, se te restará la apuesta a tu balance." +
                "<br>Si tu balance es menor a la apuesta, no podrás jugar." +
                "<br>Si tu apuesta es menor o igual a 0, no podrás jugar." +
                "<br>Si tu balance es menor a 0, no podrás jugar." +
                "</div>",
            confirmButtonText: '¡Dejame Jugar!',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    });

    //Alerta de Recompensas
    var botonRecompensas = document.getElementById("recompensas");
    botonRecompensas.addEventListener("click", function () {
        Swal.fire({
            title: 'RECOMPENSAS',
            html: "<div style='text-align: center;'>" +
                "Esta son las recompensas que puedes obtener:" +
                "<h3>Tres Iguales:</h3>" +
                "🍭🍭🍭 = x5" +
                "<br>🤡🤡🤡 = x7" +
                "<br>❌❌❌ = x7" +
                "<br>⛄️⛄️⛄️ = x7" +
                "<br>😒😒😒 = x7" +
                "<br>🙏🙏🙏 = x7" +
                "<br>🎅🎅🎅 = x7" +
                "<br>🧙🧙🧙 = x7" +
                "<br>🎁🎁🎁 = x50" +
                "<br>🤑🤑🤑 = x100" +
                "<br>💀💀💀 = x1000" +
                "<h3>Dos Iguales:</h3>" +
                "🍭🍭 = x2" +
                "<br>🤡🤡 = x2" +
                "<br>❌❌ = x2" +
                "<br>😒😒 = x2" +
                "<br>⛄️⛄️ = x4" +
                "<br>🎁🎁 = x7" +
                "<br>🙏🙏 = x2" +
                "<br>🎅🎅 = x2" +
                "<br>🧙🧙 = x2" +
                "<br>🎁🎁 = x7" +
                "<br>🤑🤑 = x10" +
                "<br>💀💀 = x25" +
                "</div>",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    });

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

    //Función al darle al spin
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

    function verificarGanancia() {
        const slotValues = [
            posicionamiento[0].querySelector('.symbol').textContent,
            posicionamiento[1].querySelector('.symbol').textContent,
            posicionamiento[2].querySelector('.symbol').textContent,
        ];

        const apuesta = parseInt(document.querySelector('#bet').value);
        const balanceActual = parseInt(balanceElement.textContent);

        // Definir un objeto para almacenar los premios
        const premios = {
            '🍭': 5,
            '🤡': 7,
            '❌': 7,
            '️⛄️': 7,
            '😒': 7,
            '🙏': 7,
            '🎅': 7,
            '🧙': 7,
            '🎁': 50,
            '🤑': 100,
            '💀': 1000,
        };

        let premio = 0;

        // Comprobar si hay tres símbolos iguales
        for (const symbol in premios) {
            if (slotValues.every(value => value === symbol)) {
                premio = apuesta * premios[symbol];
                break;
            }
        }

        // Comprobar si hay dos símbolos iguales
        const symbolsSet = new Set(slotValues);
        for (const symbol of symbolsSet) {
            if (slotValues.filter(value => value === symbol).length === 2) {
                premio = apuesta * 2;
                break;
            }
        }

        if (premio > 0) {
            console.log("Tenías " + balanceElement.textContent + "€");
            const nuevoBalance = balanceActual + premio;
            balanceElement.textContent = nuevoBalance;
            prizeElement.textContent = premio + parseInt(prizeElement.textContent);
            console.log("Has ganado: " + premio + "€");
        } else {
            console.log("No has ganado. Inténtalo de nuevo.");
        }
    }


    init()
});
