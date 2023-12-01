/*

document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");

    // Set up event listener for clicking on the board
    document.getElementById("board").addEventListener("click", function () {
      // Randomly determine the horizontal position of the ball
      const randomPosition = Math.floor(Math.random() * 100);
      ball.style.left = `${randomPosition}%`;

      // Reset the ball to the bottom of the board
      ball.style.bottom = "0";

      // Trigger the animation by setting a timeout
      setTimeout(function () {
        // Simulate the ball falling down through the pegs
        ball.style.bottom = "500px"; // Adjust the height as needed
      }, 100);
    });
  });


// PSEUDO CODIGO
function bolaJugada(){ // codigo q se hace con el atributo onclick de html en la etiqueta (EN BOTON DE JUGAR)
    // cuando se hace click en jugar (habiendo apostado) se ejecuta esta funcion
    bola.style.display = 'block';   // muestra la bola en la parte arriba central
    //function gravedad(parametros_necesarios);   // funcion q aplica la gravedad a la bola

    function path(parametros);  // funcion para determinar el camino q toma la bola
}

// funcion a aplicar cunado sepamos como van las fisicas
/*
function gravedad(lo_q_tenga_q_tener){
    // hacer q la bola siempre vaya hacia abajo alla donde este
}
*/
/*
function path(lo_q_tenga_q_tener){
    // determinar el camino con +1 o -1 si ha tomado el camino de la derecha o izquierda respectivamente
    for(i = 0; i < 8; i++) {  // q haga la 7 decisiones a tomar (en este caso)
        setTimeout(() => {  // ponemos un temporizador para tener tiempo de mostrar el cambio en tiempo real de decision
            math.random ? 1 : -1; // ns si es algo asi pero q randomice la eleccion de +1 o -1
        }, 1000);
    }
    multiplicador_X = true; // hacemos q el multiplicador donde caiga sea true para poder procesar el resultado
}

function resultado(){
    // codigo a ejecutar cuando una bola ya ha caido a un multiplicador
    if(multiplicador_X){
        // aplicar las recompensas
    }
}

/*
    EN CASO DE NO PONER GRAVEDAD TODAVIA -> hacemos q la bola se desplace hasta el siguiente punto de su path y asi
                                            respectivamente
*/



document.addEventListener("DOMContentLoaded", function() {
    var ball = document.getElementById("ball");
    var pegs = document.querySelectorAll(".peg"); // Obtiene todos los elementos de la clase "peg"

    var acceleration = 0.1;
    var velocity = 0;

    // Ajusta la posición inicial de la bola entre un 2% y un 0.1% respecto al centro de la esfera "peg" más cercana al borde superior
    var initialPositionFactor = Math.random() * (0.02 - 0.001) + 0.001;
    var firstPeg = pegs[0]; // Obtiene el primer elemento del array de esferas "peg"
    ball.style.left = (firstPeg.offsetLeft + firstPeg.clientWidth / 2 - ball.clientWidth / 2) * (1 + initialPositionFactor) + "px";

    // Ajusta el factor de rebote (ajustable según sea necesario)
    var bounceFactor = 0.8;

    function updateBallPosition() {
      velocity += acceleration;
      var currentY = parseFloat(ball.style.top) || 0;
      var newY = currentY + velocity;
      ball.style.top = newY + "px";

      // Recorre el array de esferas "peg" para comprobar la colisión con cada una de ellas
      for (var i = 0; i < pegs.length; i++) {
        var peg = pegs[i]; // Obtiene el elemento actual del array de esferas "peg"

        // Calcular la posición relativa de la bola con respecto al centro de la esfera "peg"
        var pegCenterX = peg.offsetLeft + peg.clientWidth / 2;
        var ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
        var relativePosition = ballCenterX - pegCenterX;

        // Verifica la colisión precisa con el objeto de la clase "peg"
        if (
          newY + ball.clientHeight >= peg.offsetTop &&
          newY <= peg.offsetTop + peg.clientHeight &&
          Math.abs(relativePosition) <= (peg.clientWidth / 2) &&
          ball.offsetLeft + ball.clientWidth >= peg.offsetLeft &&
          ball.offsetLeft <= peg.offsetLeft + peg.clientWidth
        ) {
          // Si hay colisión, ajusta la dirección de la velocidad en función de la posición relativa
          velocity = -velocity * bounceFactor;

          // Ajusta la posición de la bola para evitar la superposición
          ball.style.top = (peg.offsetTop - ball.clientHeight) + "px";

          // Ajusta la dirección lateral de la bola en función de la posición relativa
          ball.style.left = (ball.offsetLeft - relativePosition) + "px";

          // Reproduce un sonido de rebote
          audio.play();

          // Cambia el color de la esfera "peg" a uno de los tres colores indicados
          var colors = ["#F5F5DC", "#000000", "#D2691E"]; // Array de colores en formato hexadecimal
          var randomColor = colors[Math.floor(Math.random() * colors.length)]; // Selecciona un color al azar
          peg.style.backgroundColor = randomColor; // Aplica el color a la esfera "peg"
        }
      }

      // Solicita una nueva actualización en el próximo cuadro de animación
      requestAnimationFrame(updateBallPosition); // Añade esta línea para crear un bucle de animación
    }

    document.addEventListener("click", function() {
      // Cambia la posición inicial de la bola al hacer clic
      var newPositionFactor = Math.random() * (0.02 - 0.001) + 0.001;
      ball.style.left = (firstPeg.offsetLeft + firstPeg.clientWidth / 2 - ball.clientWidth / 2) * (1 + newPositionFactor) + "px";

      // Resetea la velocidad y la posición de la bola al hacer clic
      velocity = 0; // Añade esta línea para resetear la velocidad
      ball.style.top = 0; // Añade esta línea para resetear la posición

      requestAnimationFrame(updateBallPosition);
    });
  });


