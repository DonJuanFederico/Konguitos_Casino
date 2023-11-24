function reglas() {
    Swal.fire({
        title: 'Reglas',
        html: "<div style='text-align: center;'>" +
            " En cada partida el Konguito lanza una bola sobre la ruleta en movimiento," +
            " después de que la bola gire varias vueltas caerá sobre una de las casillas de la ruleta." +
            " El objetivo del juego es predecir en que casilla caerá la bola." +
            "<br> <br> El Konguito anuncia el inicio de una nueva partida," +
            " en ese momento las apuestas para la siguiente partida quedan abiertas," +
            " los jugadores podrán realizar sus apuestas sobre el tapete hasta que el Konguito " +
            " cierre las apuestas. Después de cerrar las apuestas," +
            " el Konguito lanzará la bola, cuando la bola se detenga en alguna de las casillas, " +
            "el crupier anunciará el numero ganador y las apuestas ganadoras, " +
            "seguidamente procederá a retirar las apuestas perdedoras y a pagar las apuestas ganadoras." +
            "</div>",
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
        html: "<div style='text-align: center;'>" +
            "</div>",
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
