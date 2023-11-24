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


/*
    Hacer que la bola elija entre derecha o izquierda con +1 o -1 respectivamente y calcular en q multiplicador cae con
    respecto a la suma total del camino tomado:
        es decir si cae en un multiplicador q sea -4 es q ha tomado 4 izquierdas mas q derechas.
*/