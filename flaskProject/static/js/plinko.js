document.addEventListener("DOMContentLoaded", function() {
    var board = document.getElementById("board");
    var pegs = document.querySelectorAll(".peg");
    var audio = new Audio('/static/audio/uff.mp3');

    var aceleracionInicial = 0.1;
    var factorRebote = 0.6;
    var ignorarColisiones = false;
    var idAnimacion;

    var bola = document.getElementById("ball");

    function reiniciarBola() {
        //Cancelamos la animación anterior en el caso que exista
        if (idAnimacion) {
            cancelAnimationFrame(idAnimacion);
        }

        var factorNuevaPosicion = Math.random() * (0.02) - 0.01;
        bola.style.left = (board.clientWidth / 2 - bola.clientWidth / 2) + (factorNuevaPosicion * board.clientWidth / 2) + "px";
        bola.style.top = 0;
        bola.velocidadX = 0;
        bola.velocidadY = 0;
        bola.aceleracion = aceleracionInicial;

        idAnimacion = requestAnimationFrame(function() {
            actualizarPosicionBola();
        });
    }

    function actualizarPosicionBola() {
        if (bola.offsetTop + bola.clientHeight >= board.clientHeight * 0.9) {
            bola.velocidadX = 0;
            bola.velocidadY = 0;
            bola.aceleracion = 0;
        } else {
            bola.velocidadY += bola.aceleracion;
        }

        var posYActual = parseFloat(bola.style.top) || 0;
        var nuevaPosY = posYActual + bola.velocidadY;
        var posXActual = parseFloat(bola.style.left) || 0;
        var nuevaPosX = posXActual + bola.velocidadX;

        bola.style.top = nuevaPosY + "px";
        bola.style.left = nuevaPosX + "px";

        for (var i = 0; i < pegs.length; i++) {
            var peg = pegs[i];
            var centroXPeg = peg.offsetLeft + peg.clientWidth / 2;
            var centroYPeg = peg.offsetTop + peg.clientHeight / 2;
            var centroXBola = bola.offsetLeft + bola.clientWidth / 2;
            var centroYBola = bola.offsetTop + bola.clientHeight / 2;

            var dx = centroXBola - centroXPeg;
            var dy = centroYBola - centroYPeg;
            var distancia = Math.sqrt(dx * dx + dy * dy);

            if (!ignorarColisiones && distancia <= peg.clientWidth / 2 + bola.clientWidth / 2) {
                var normalX = dx / distancia;
                var normalY = dy / distancia;

                var productoPunto = bola.velocidadX * normalX + bola.velocidadY * normalY;
                var tangenteX = bola.velocidadX - productoPunto * normalX;
                var tangenteY = bola.velocidadY - productoPunto * normalY;

                bola.velocidadX = tangenteX - factorRebote * normalX * productoPunto;
                bola.velocidadY = tangenteY - factorRebote * normalY * productoPunto;

                var superposicion = (peg.clientWidth / 2 + bola.clientWidth / 2) - distancia;
                bola.style.top = (bola.offsetTop + superposicion * normalY) + "px";
                bola.style.left = (bola.offsetLeft + superposicion * normalX) + "px";

                audio.play();

                var colores = ["#F5F5DC", "#000000", "#D2691E"];
                var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
                peg.style.backgroundColor = colorAleatorio;

                ignorarColisiones = true;
                setTimeout(function() {
                    ignorarColisiones = false;
                }, 10);
            }
        }

        idAnimacion = requestAnimationFrame(function() {
            actualizarPosicionBola();
        });
    }

    document.addEventListener("click", function() {
        reiniciarBola();
        setTimeout(function() {
            ignorarColisiones = false;
        }, 10);
    });

    reiniciarBola();
});