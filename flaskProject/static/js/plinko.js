document.addEventListener("DOMContentLoaded", function() {
    var ball = document.getElementById("ball");
    var pegs = document.querySelectorAll(".peg");

    var acceleration = 0.1;
    var velocityX = 0; // Cambiado a velocityX para manejar la velocidad horizontal
    var velocityY = 0; // Se añadió velocityY para manejar la velocidad vertical
    var audio = new Audio('/static/audio/uff.mp3');

   // Ajusta la posición inicial de la bola entre un 2% y un 0.1% respecto al centro de la esfera "peg" más cercana al borde superior
    var initialPositionFactor = Math.random() * (0.02 - 0.001) + 0.001;
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
                velocityY = -velocityY * bounceFactor;
                velocityX = velocityX * bounceFactor;

                var distance = Math.sqrt(Math.pow(relativePosition, 2) + Math.pow(velocityY, 2));
                var angle = Math.atan2(velocityY, relativePosition);

                var offset = (peg.clientWidth / 2 + ball.clientWidth / 2) - distance;
                ball.style.top = (ball.offsetTop - velocityY * Math.sin(angle)) + "px";
                ball.style.left = (ball.offsetLeft - velocityY * Math.cos(angle)) + "px";

                audio.play();

                var colors = ["#F5F5DC", "#000000", "#D2691E"];
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                peg.style.backgroundColor = randomColor;

                ignoreCollisions = true;

                setTimeout(function() {
                    ignoreCollisions = false;
                }, 500);
            }
        }

        requestAnimationFrame(updateBallPosition);
    }

    document.addEventListener("click", function() {
        var newPositionFactor = Math.random() * (0.02 - 0.001) + 0.001;
        ball.style.left = (firstPeg.offsetLeft + firstPeg.clientWidth / 2 - ball.clientWidth / 2) * (1 + newPositionFactor) + "px";

        velocityX = 0;
        velocityY = 0;
        ball.style.top = 0;

        requestAnimationFrame(updateBallPosition);
    });

    updateBallPosition(); // Agregado para iniciar la animación inmediatamente
});



