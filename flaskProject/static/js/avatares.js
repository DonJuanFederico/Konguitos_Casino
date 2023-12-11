document.addEventListener("DOMContentLoaded", function () {
    const backgroundElements = document.querySelectorAll(".background");
    const characterElements = document.querySelectorAll(".character");
    const currentBackground = document.querySelector("#current-photo .background");
    const currentCharacter = document.querySelector("#current-photo .character");

    function changeBackgroundColor(color) {
        currentBackground.style.backgroundColor = color;
    }

    function changeCharacter(characterImage) {
        currentCharacter.style.backgroundImage = `url('/static/images/avatares/${characterImage}.png')`;
    }

    backgroundElements.forEach((element) => {
        element.addEventListener("click", () => {
            const backgroundColor = element.getAttribute("data-background");
            changeBackgroundColor(backgroundColor);
        });
    });

    characterElements.forEach((element) => {
        element.addEventListener("click", () => {
            const characterImage = element.getAttribute("data-character");
            changeCharacter(characterImage);
        });
    });

    const unlockButton = document.getElementById("unlock-button");
    const images = document.querySelectorAll('.character');

    unlockButton.addEventListener("click", () => {
        images.forEach((img) => {
            img.setAttribute('data-locked', 'false');
            img.style.filter = 'none';
        });
    });
});
