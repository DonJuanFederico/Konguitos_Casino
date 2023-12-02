document.addEventListener("DOMContentLoaded", function() {
  var board = document.getElementById("board");
  var pegs = document.querySelectorAll(".peg");
  var audio = new Audio('/static/audio/uff.mp3');

  var aceleracionInicial = 0.1;
  var factorRebote = 0.6;
  var ignorarColisiones = false;
  var idAnimacion;

  var bola = document.getElementById("ball");

  var score = 0; // Variable para almacenar el número de la zona amarilla que ha tocado la bola
  var contador = 0; // Variable para almacenar el número de veces que la bola ha pasado el top: 58.5%
  var paso = false; // Variable para indicar si la bola ha pasado o no el top: 58.5%

  function reiniciarBola() {
      //Cancelamos la animación anterior en el caso que exista
      if (idAnimacion) {
          cancelAnimationFrame(idAnimacion);
      }

      var factorNuevaPosicion = Math.random() * (0.02 - 0.005) + 0.005
      bola.style.left = (board.clientWidth / 2 - bola.clientWidth / 2) + (factorNuevaPosicion * board.clientWidth / 2) + "px";
      bola.style.top = 0;
      bola.velocidadX = 0;
      bola.velocidadY = 0;
      bola.aceleracion = aceleracionInicial;

      idAnimacion = requestAnimationFrame(function() {
          actualizarPosicionBola();
      });

      mostrarContador(); // Mostramos el valor del contador en la consola
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
              }, 1);
          }
      }

      // Actualizamos el valor de la variable score y el texto del elemento con el id de score
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

      // Actualizamos el valor de la variable contador y el valor de la variable paso
      if (posYActual >= board.clientHeight * 0.585) {
          paso = true;
      } else {
          if (paso) {
              contador++;
              paso = false;
          }
      }

      // Mostramos u ocultamos el cuadrado blanco según la velocidad de la bola
      if (bola.velocidadX === 0 && bola.velocidadY === 0) {
        mostrarScore(true); // Mostramos el cuadrado blanco cuando la bola está quieta
      } else {
        mostrarScore(false); // Ocultamos el cuadrado blanco cuando la bola está en movimiento
      }

      idAnimacion = requestAnimationFrame(function() {
          actualizarPosicionBola();
      });
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

  document.addEventListener("click", function() {
      reiniciarBola();
      setTimeout(function() {
          ignorarColisiones = false;
      }, 1);
  });

  reiniciarBola();
});
