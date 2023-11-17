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