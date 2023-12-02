// variables
let roundCounter = 1;
let number = 4;
let extra = 2;
const opciones = ['WIN','WIN', 'WIN', 'DEFEAT'];

//document.getElementById('counter').textContent = opciones;
function startGame() {
    firstOptions();

    document.getElementById('marcoJuego').addEventListener('click', function (event) {
        // coger lo elementos con la clase seleccionada
        var elementosConClase = document.getElementsByClassName("option-button");
        var arrayElementos = Array.from(elementosConClase);
        if (event.target.classList.contains('option-button')) {
            document.getElementById('counter').textContent = 'Estas en la ronda: ' + roundCounter  + '. Las opciones son: ' + opciones;
            roundCounter++;
            // Check if 5 rounds have passed
            if (roundCounter % 5 === 1) {

                if (roundCounter < 17) {
                    document.getElementById('counter').textContent = 'Ronda: ' + (roundCounter - 1)  + ', opciones:' + (number + extra) + ". Ahora tienes mas opciones";
                    // remove previous options
                    removeOptions(arrayElementos);
                    moreOptions();
                    // Add two more options
                    addOptions(number, extra);
                    extra = extra + 2;
                }
            }
            else if(roundCounter > 16){
                removeOptions(arrayElementos);
                opciones.sort(() => Math.random() - 0.5);
                addOptions(number, (extra - 2));
            }
            // Update options for the next round
            //firstOptions();
        }
    });
}

function firstOptions() {
    opciones.sort(() => Math.random() - 0.5);  // desordena las opciones
    // Clear existing options
    document.getElementById('marcoJuego').innerHTML = '';
    // Generate 4 random options
    if(roundCounter === 1) addOptions(0, 4);
}

function addOptions(act_opt, mr_opt) {
    for (let i = 0; i < (act_opt + mr_opt); i++) {
        const optionButton = document.createElement('div');
        optionButton.classList.add('option-button');

        //1.- optionButton.textContent = i + ' ' + opciones[Math.floor(Math.random() * opciones.length)];

        /*2.- gg = opciones[Math.floor(Math.random() * opciones.length)];
              optionButton.textContent = i + ' ' + gg;
              opciones.splice(gg, 1);*/

        // 3.- asignar las posiciones a cada opcion 1 a 1
        optionButton.textContent = (i + 1) + ' ' + opciones[i];
        document.getElementById('marcoJuego').appendChild(optionButton);
    }
}

function removeOptions(arrayElementos) {
    //document.getElementById('counter').textContent = arrayElementos;
    arrayElementos.forEach(function(elemento) {
        elemento.remove();
    });
}

function moreOptions(){
    // opciones.push('WIN', 'WIN', 'WIN', 'DEFEAT');
    if(roundCounter === 6){
        opciones.push('WIN', 'DEFEAT');
    }
    else if(roundCounter === 11 || 16) opciones.push('DEFEAT', 'DEFEAT');
    opciones.sort(() => Math.random() - 0.5);
}
// Start the game
startGame();