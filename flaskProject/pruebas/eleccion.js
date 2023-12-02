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
            roundCounter++;
            prob = prob_acierto(opciones, 'WIN');
            //checkOption();
            // Check if 5 rounds have passed
            if (roundCounter % 5 === 1) {
                if (roundCounter < 17) {
                    document.getElementById('counter').textContent = 'Ronda: ' + (roundCounter - 1)  + ', opciones:' + (number + extra) + ', prob. acierto: ' + prob + ". Ahora tienes mas opciones";
                    // remove previous options
                    removeOptions(arrayElementos);
                    moreOptions();
                    // Add two more options
                    addOptions(number, extra);
                    extra = extra + 2;
                }
            }
            if(roundCounter % 5 !== 1 || roundCounter > 16){
                removeOptions(arrayElementos);
                opciones.sort(() => Math.random() - 0.5);
                addOptions(number, (extra - 2));
                document.getElementById('counter').textContent = 'Ronda: ' + (roundCounter - 1)  + ', opciones:' + (number + extra - 2) + ', prob. acierto: ' + prob;
            }
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
        optionButton.textContent = opciones[i]; //(i + 1) + ' ' + opciones[i];
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

function checkOption(){
    if(event.target.textContent === 'DEFEAT'){
        Swal.fire({
            imageUrl: `/static/images/carta_mas_alta/loser.png`,
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: `rgba(0,0,0,0.6)`,
            background: `none`,
        });
        roundCounter = 1;
    } else{
        Swal.fire({
            imageUrl: `/static/images/carta_mas_alta/mensaje_win.png`,
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: `rgba(0,0,0,0.6)`,
            background: `none`,
        });
    }
}

function prob_acierto(opciones, eventoDeseado){
    const eventosDeseados = opciones.filter(opcion => opcion === eventoDeseado);
    return eventosDeseados.length / opciones.length;
}

// Start the game
startGame();