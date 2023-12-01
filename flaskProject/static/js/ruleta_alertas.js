function reglas() {
    Swal.fire({
        title: 'Reglas',
        html: "<div style='text-align: center;'>" +
            "1. Se escoje la ficha que se quiere apostar" +
            "<br>2. Se escoje la casilla a la que se quiere apostar" +
            "<br>1to18: 1 a 18" +
            "<br>19to36: 19 a 36" +
            "<br>even: pares" +
            "<br>odd: impares" +
            "<br>red: rojos" +
            "<br>black: negro" +
            "<br> 1st 12: 1 a 12" +
            "<br> 2nd 12: 13 a 24" +
            "<br> 3rd 12: 25 a 36" +
            "<br> 3. Pulsa el botón girar",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}


function recompensas() {
    Swal.fire({
        title: 'Recompensas',
        html: "<div style='text-align: center;'></div>" +
            "<br> 36 números: 1 a 1" +
            "<br> 24 números: 1 a 1" +
            "<br> 18 números: 1 a 1" +
            "<br> 12 números: 2 a 1" +
            "<br> 1 número: 35 a 1",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}

function leyenda() {
    Swal.fire({
        title: 'LEYENDA',
        html: "<div style='text-align: center;'>" +
            " Este es el valor de cada moneda" +
            "<h3>Monedas:</h3>" +
            "<img src='/static/images/monedaCobre.png' style='width: 10%'> 1 KC </br>" +
            "<img src='/static/images/moneda.png' style='width: 10%'> 10 KC </br>" +
            "<img src='/static/images/monedaRubi.png' style='width: 10%'> 50 KC </br>" +
            "<img src='/static/images/moneda_dorada.png' style='width: 10%'> 100 KC </br>" +
            "<img src='/static/images/monedaDiamante.png' style='width: 10%'> 250 KC </br>" +
            "</div>",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '50%',
    });
}
