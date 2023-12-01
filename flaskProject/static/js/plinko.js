/*
document.addEventListener("DOMContentLoaded", function() {
    var ball = document.getElementById("ball");
    var pegs = document.querySelectorAll(".peg"); // Obtiene todos los elementos de la clase "peg"

    var acceleration = 0.1;
    var velocityX = 0; // Cambiado a velocityX para manejar la velocidad horizontal
    var velocityY = 0; // Se añadió velocityY para manejar la velocidad vertical
    var audio = new Audio('/static/audio/uff.mp3');

    // Ajusta la posición inicial de la bola entre un 2% y un 0.1% respecto al centro de la esfera "peg" más cercana al borde superior
    var initialPositionFactor = Math.random() * (0.02) - 0.01;
    var firstPeg = pegs[0]; // Obtiene el primer elemento del array de esferas "peg"
    ball.style.left = (firstPeg.offsetLeft + firstPeg.clientWidth / 2 - ball.clientWidth / 2) * (1 + initialPositionFactor) + "px";

    var bounceFactor = 0.8;

    var ignoreCollisions = false;

    function updateBallPosition() {
        velocityY += acceleration;
        var currentY = parseFloat(ball.style.top) || 0;
        var newY = currentY + velocityY;

        var currentX = parseFloat(ball.style.left) || 0;
        var newX = currentX + velocityX;

        ball.style.top = newY + "px";
        ball.style.left = newX + "px";

        for (var i = 0; i < pegs.length; i++) {
            var peg = pegs[i];

            var pegCenterX = peg.offsetLeft + peg.clientWidth / 2;
            var ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
            var relativePosition = ballCenterX - pegCenterX;

            if (
                !ignoreCollisions &&
                newY + ball.clientHeight >= peg.offsetTop &&
                newY <= peg.offsetTop + peg.clientHeight &&
                Math.abs(relativePosition) <= (peg.clientWidth / 2 + ball.clientWidth / 2) &&
                newX + ball.clientWidth >= peg.offsetLeft &&
                newX <= peg.offsetLeft + peg.clientWidth
            ) {
                // Si hay colisión, ajusta la dirección de la velocidad en función de la posición relativa
                var normalX = relativePosition; // Calcula el vector normal al peg en el eje X
                var normalY = 0; // Calcula el vector normal al peg en el eje Y
                var angle = Math.acos((velocityX * normalX + velocityY * normalY) / (Math.sqrt(Math.pow(velocityX, 2) + Math.pow(velocityY, 2)) * Math.sqrt(Math.pow(normalX, 2) + Math.pow(normalY, 2)))); // Calcula el ángulo de incidencia usando el producto escalar
                var Vxi = velocityX * Math.cos(angle); // Calcula la velocidad horizontal inicial
                var Vyi = velocityY * Math.sin(angle); // Calcula la velocidad vertical inicial
                var Vxf = Vxi * bounceFactor; // Calcula la velocidad horizontal final (se conserva, pero con rebote lateral reducido)
                var Vyf = -Vyi * bounceFactor; // Calcula la velocidad vertical final (se invierte y se multiplica por el factor de rebote)
                velocityX = Vxf * Math.cos(angle) - Vyf * Math.sin(angle); // Calcula la velocidad horizontal resultante
                velocityY = Vxf * Math.sin(angle) + Vyf * Math.cos(angle); // Calcula la velocidad vertical resultante

                // Ajusta la posición de la bola para evitar la superposición
                var distance = Math.sqrt(Math.pow(relativePosition, 2) + Math.pow(velocityY, 2));
                var offset = (peg.clientWidth / 2 + ball.clientWidth / 2) - distance;
                ball.style.top = (ball.offsetTop - velocityY * Math.sin(angle)) + "px";
                ball.style.left = (ball.offsetLeft - velocityX * Math.cos(angle)) + "px";

                // Reproduce un sonido de rebote
                audio.play();

                // Cambia el color de la esfera "peg" a uno de los tres colores indicados
                var colors = ["#F5F5DC", "#000000", "#D2691E"];
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                peg.style.backgroundColor = randomColor;

                // Cambia el estado de la bola a ignorar las colisiones
                ignoreCollisions = true;

                // Crea un temporizador que cambie el estado de la bola a no ignorar las colisiones después de 0.1 segundos
                setTimeout(function() {
                    ignoreCollisions = false;
                }, 100); // Cambiado de 500 a 100
            }
        }

        requestAnimationFrame(updateBallPosition);
    }

    document.addEventListener("click", function() {
        var newPositionFactor = Math.random() * (0.02 - 0.001) + 0.001;
        ball.style.left = (firstPeg.offsetLeft + firstPeg.clientWidth / 2 - ball.clientWidth / 2) * (1 + newPositionFactor) + "px";

        velocityX = 0; // Añadido para reestablecer la velocidad horizontal
        velocityY = 0; // Añadido para reestablecer la velocidad vertical
        acceleration = 0.1; // Añadido para reestablecer la aceleración
        ball.style.top = 0;

        requestAnimationFrame(updateBallPosition);
    });

    updateBallPosition(); // Agregado para iniciar la animación inmediatamente
});

*/
// Añade el evento que espera a que el documento esté listo


document.addEventListener("DOMContentLoaded", function() {
    var ball = document.getElementById("ball");
    var pegs = document.querySelectorAll(".peg");
    var audio = new Audio('/static/audio/uff.mp3');

    var acceleration = 0.1;
    var velocityX = 0;
    var velocityY = 0;
    var bounceFactor = 0.6; // Ajusta este valor para cambiar la fuerza del rebote
    var ignoreCollisions = false;

    function updateBallPosition() {
        velocityY += acceleration;

        var currentY = parseFloat(ball.style.top) || 0;
        var newY = currentY + velocityY;
        var currentX = parseFloat(ball.style.left) || 0;
        var newX = currentX + velocityX;

        ball.style.top = newY + "px";
        ball.style.left = newX + "px";

        for (var i = 0; i < pegs.length; i++) {
            var peg = pegs[i];

            var pegCenterX = peg.offsetLeft + peg.clientWidth / 2;
            var pegCenterY = peg.offsetTop + peg.clientHeight / 2;
            var ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
            var ballCenterY = ball.offsetTop + ball.clientHeight / 2;

            var dx = ballCenterX - pegCenterX;
            var dy = ballCenterY - pegCenterY;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (
                !ignoreCollisions &&
                distance <= peg.clientWidth / 2 + ball.clientWidth / 2
            ) {
                var normalX = dx / distance;
                var normalY = dy / distance;

                // Descompone la velocidad en componentes tangenciales y normales
                var dotProduct = velocityX * normalX + velocityY * normalY;
                var tangentX = velocityX - dotProduct * normalX;
                var tangentY = velocityY - dotProduct * normalY;

                // Calcula la velocidad después del rebote con el nuevo bounceFactor
                velocityX = tangentX - bounceFactor * normalX * dotProduct;
                velocityY = tangentY - bounceFactor * normalY * dotProduct;

                // Ajusta la posición para evitar superposiciones
                var overlap = (peg.clientWidth / 2 + ball.clientWidth / 2) - distance;
                ball.style.top = (ball.offsetTop + overlap * normalY) + "px";
                ball.style.left = (ball.offsetLeft + overlap * normalX) + "px";

                audio.play();

                var colors = ["#F5F5DC", "#000000", "#D2691E"];
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                peg.style.backgroundColor = randomColor;

                ignoreCollisions = true;

                setTimeout(function() {
                    ignoreCollisions = false;
                }, 100);
            }
        }

        requestAnimationFrame(updateBallPosition);
    }

    document.addEventListener("click", function() {
        var newPositionFactor = Math.random() * (0.02) - 0.01;
        ball.style.left = (board.clientWidth / 2 - ball.clientWidth / 2) + (newPositionFactor * board.clientWidth / 2) + "px";
        velocityX = 0;
        velocityY = 0;
        ball.style.top = 0;
        requestAnimationFrame(updateBallPosition);
    });

    updateBallPosition();
});

