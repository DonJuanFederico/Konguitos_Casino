const player = document.getElementById("player");
const fondo = document.getElementById("fondo");

let scoreInterval;
/*
    Cuando haces click en el documento:document.addEventListener("click", function()
*/
const board = document.getElementById("board");
board.addEventListener("click", function(){
    addClassJump();
});

player.addEventListener("animationend", () =>{
    removeClassJump();
});

let score = 0.95;

function addClassJump(){
    player.classList.add("playerJump");
}

function removeClassJump(){
    player.classList.remove("playerJump");
}

function stopAnimation(){
    fondo.style.animationPlayState = "paused";
    player.style.animationPlayState = "paused";
}

function resumeGame(){
    resumeAnimation();
    resumeScore();
}

function resumeScore(){
    scoreInterval = setInterval(() => {
        if(getComputedStyle(player).animationPlayState === "running"){
            score = score + 0.05;
        }
        document.getElementById("score").innerText = score.toFixed(2);
    }, 250);
}

function stopScore(){
    clearInterval(scoreInterval);
}

function resumeAnimation(){
    fondo.style.animationPlayState = "running";
    player.style.animationPlayState = "running";
}

function pauseGame(){
    stopAnimation();
    stopScore();
}

const buttonPlayStop = document.getElementById("buttonPlayStop");

buttonPlayStop.addEventListener("click", () => {
    if(buttonPlayStop.classList.contains("pausa")){
        //Reanudo el juego
        resumeGame();
    }else{
        pauseGame();
    }
    /*
        Toggle hace la funcion de if:
        if buttonPlayStop.classList tiene la clase play: se quita
        else: la añado
    */
    buttonPlayStop.classList.toggle("pausa");
    //Si es un botón de play continua el juego
    //Si es un botón de pausa, para el juego
})

const restartButton = document.getElementById("restartGame");

restartButton.addEventListener("click", restartGame)

function restartGame(){
    score = 0.95;
}