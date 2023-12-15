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

    //Bloqueo y desbloqueo de personajes en función del gashapon
    const pirataAvatar = document.querySelector('.character.pirate');

    if (PIRATA == 1) {
        pirataAvatar.dataset.locked = 'false';
    } else {
        pirataAvatar.dataset.locked = 'true';
    }

    const reyAvatar = document.querySelector('.character.king');
    if (REY == 1) {
        reyAvatar.dataset.locked = 'false';
    } else {
        reyAvatar.dataset.locked = 'true';
    }

    const astronautaAvatar = document.querySelector('.character.astronaut');
    if (ASTRONAUTA == 1) {
        astronautaAvatar.dataset.locked = 'false';
    } else {
        astronautaAvatar.dataset.locked = 'true';
    }

    const capitanAvatar = document.querySelector('.character.captain');
    if (CAPITAN == 1) {
        capitanAvatar.dataset.locked = 'false';
    } else {
        capitanAvatar.dataset.locked = 'true';
    }

    const tigreAvatar = document.querySelector('.character.tiger');
    if (TIGRE == 1) {
        tigreAvatar.dataset.locked = 'false';
    } else {
        tigreAvatar.dataset.locked = 'true';
    }

    const vikingoAvatar = document.querySelector('.character.viking');
    if (VIKINGO == 1) {
        vikingoAvatar.dataset.locked = 'false';
    } else {
        vikingoAvatar.dataset.locked = 'true';
    }

    const saveChangesButton = document.getElementById("save-changes");

    // Evento clic para guardar cambios
    saveChangesButton.addEventListener("click", function () {
        const currentBackground = document.querySelector("#current-photo .background");
        const currentCharacter = document.querySelector("#current-photo .character");

        const backgroundColor = currentBackground.style.backgroundColor;
        const backgroundImage = currentCharacter.style.backgroundImage;
        const characterImage = backgroundImage.split('/').slice(-1)[0].replace(/["'()]/g, '').split('.')[0];
        console.log("Personaje seleccionado:", characterImage);

        //Los datos que se envían
        const datosAvatar = {
            backgroundColor: backgroundColor,
            characterImage: characterImage
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/modificar_avatar", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Estilos de avatar guardados correctamente en la base de datos");
                } else {
                    console.error('Error al guardar los estilos del avatar:', xhr.status);
                }
            }
        };

        xhr.send(JSON.stringify(datosAvatar));
        Swal.fire({
            title: 'Tu avatar se ha guardado correctamente',
            confirmButtonText: 'Perfecto',
            confirmButtonColor: '#d6b530',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
        document.location.href = '/Perfil_de_usuario/';
    });

    //Cargar avatar anterior
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log("Respuesta del servidor:", data);
                const nombrePersonaje = data.resultado.personaje; // Asigna el nombre del personaje
                const colorFondo = data.resultado.fondo;
                console.log("Nombre del personaje obtenido:", nombrePersonaje);

                changeBackgroundColor(colorFondo);
                changeCharacter(nombrePersonaje);

            } else {
                console.error('Error al obtener el nombre del personaje:', xhr.status);
            }
        }
    };
    xhr.open("GET", "/obtener_avatar", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
});

// boton de la toolbar de marcha atras
var bontonAtras = document.querySelector('.back');
// funcion para ir a la ventana de atras
function volverAtras(){document.location.href = '/Perfil_de_usuario/';}
