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
    function gravedad(parametros_necesarios);   // funcion q aplica la gravedad a la bola

    function path(parametros);  // funcion para determinar el camino q toma la bola
}

// funcion a aplicar cunado sepamos como van las fisicas
/*
function gravedad(lo_q_tenga_q_tener){
    // hacer q la bola siempre vaya hacia abajo alla donde este
}
*/

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
