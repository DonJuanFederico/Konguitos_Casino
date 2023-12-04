document.addEventListener("DOMContentLoaded", function () {
    var board = document.getElementById("board");
    var pegs = document.querySelectorAll(".peg");
    var audio = new Audio('/static/audio/uff.mp3');

    var aceleracionInicial = 0.1;
    var factorRebote = 0.6;
    var ignorarColisiones = false;
    var idAnimacion;

    var multiplicadores = [0, 3, 1, 0.5, 0, 0.5, 1, 3, 0];

    function mostrarMultiplicadores() {
        for (var i = 0; i < multiplicadores.length; i++) {
            var span = document.getElementById("multi-" + (i + 1));
            span.textContent = "x" + multiplicadores[i];
        }
    }


    mostrarMultiplicadores();


    var valor = 0;

    var bola = document.getElementById("ball");

    var score = 0;
    var contador = 0;
    var paso = false;

    function reiniciarBola() {
        if (idAnimacion) {
            cancelAnimationFrame(idAnimacion);
        }

        var factorNuevaPosicion = Math.random() * (0.02 - 0.005) + 0.005;
        bola.style.left = (board.clientWidth / 2 - bola.clientWidth / 2) + (factorNuevaPosicion * board.clientWidth / 2) + "px";
        bola.style.top = 0;
        bola.velocidadX = 0;
        bola.velocidadY = 0;
        bola.aceleracion = aceleracionInicial;

        idAnimacion = requestAnimationFrame(function () {
            actualizarPosicionBola();
        });

        mostrarContador();
    }

    function actualizarPosicionBola() {
        if (valor > 0) {
            if (valor > 0) {
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
                        setTimeout(function () {
                            ignorarColisiones = false;
                        }, 1);
                    }
                }

                if (posXActual >= 0 && posXActual < board.clientWidth * 0.325) {
                    actualizarScore(1);
                } else if (posXActual >= board.clientWidth * 0.325 && posXActual < board.clientWidth * 0.375) {
                    actualizarScore(2);
                } else if (posXActual >= board.clientWidth * 0.375 && posXActual < board.clientWidth * 0.425) {
                    actualizarScore(3);
                } else if (posXActual >= board.clientWidth * 0.425 && posXActual < board.clientWidth * 0.475) {
                    actualizarScore(4);
                } else if (posXActual >= board.clientWidth * 0.475 && posXActual < board.clientWidth * 0.525) {
                    actualizarScore(5);
                } else if (posXActual >= board.clientWidth * 0.525 && posXActual < board.clientWidth * 0.575) {
                    actualizarScore(6);
                } else if (posXActual >= board.clientWidth * 0.575 && posXActual < board.clientWidth * 0.625) {
                    actualizarScore(7);
                } else if (posXActual >= board.clientWidth * 0.625 && posXActual < board.clientWidth * 0.675) {
                    actualizarScore(8);
                } else if (posXActual >= board.clientWidth * 0.675 && posXActual <= board.clientWidth) {
                    actualizarScore(9);
                }

                if (posYActual >= board.clientHeight * 0.585) {
                    paso = true;
                } else {
                    if (paso) {
                        contador++;
                        paso = false;
                    }
                }

                if (bola.velocidadX === 0 && bola.velocidadY === 0) {
                    mostrarScore(true);
                } else {
                    mostrarScore(false);
                }

                idAnimacion = requestAnimationFrame(function () {
                    actualizarPosicionBola();
                });
            }
        }
    }

    function actualizarScore(numero) {
        score = numero;
        document.getElementById("score").textContent = score;
    }

    function mostrarScore(valor) {
        var score = document.getElementById("score");
        if (valor) {
            score.style.display = "flex";
        } else {
            score.style.display = "none";
        }
    }

    function mostrarContador() {
        console.log("La bola ha pasado el top: 58.5% " + contador + " veces.");
    }

    document.getElementById("guardar").addEventListener("click", function () {
        valor = document.getElementById("numero").value;
        console.log("Se ha guardado el número " + valor);

        // Llamamos a la función para reiniciar la bola después de guardar el valor
        reiniciarBola();

        setTimeout(function () {
            ignorarColisiones = false;
        }, 1);
    });

    document.addEventListener("click", function () {
        reiniciarBola();
        setTimeout(function () {
            ignorarColisiones = false;
        }, 1);
    });

    reiniciarBola();
});
