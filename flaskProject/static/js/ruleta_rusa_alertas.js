function reglas() {
    Swal.fire({
        title: 'REGLAS',
        html: "<div style='text-align: center;'>" +
            " Esta son las reglas de la famosa RULETA RUSA" +
            "<h3>REGLAS:</h3>" +
            "1. Tienes en tu mano un revólver con 6 recámaras (6 huecos para una bala)." +
            "<br>2. El juego aleatoriamente colocará una bala en una de las recámaras." +
            "<br>3. Cuando estés listo, dale a Inciar Juego (Recuerda que debes ingresar lo apostado para jugar)." +
            "<br>4. Si no te ha tocado la bala puedes seguir jugando o si eres un cagón retirarte." +
            "<br>5. Si te ha tocado la bala, has muerto y no ganas nada." +
            "<br>6. Si decides retirarte, ganarás hasta donde has llegado" +
            "<br>7. Si ha llegado a la recámara 5 sin retirarte, significa que le echaste huevos asi que ganas directamente." +
            "<h3>Normas a tener en cuenta:</h3>" +
            "Si ganas, se te sumará el premio a tu balance." +
            "<br>Si pierdes, no se te sumará nada." +
            "<br>Si tu balance es menor a la apuesta, no podrás jugar." +
            "<br>Si tu apuesta es menor o igual a 0, no podrás jugar." +
            "<br>Si tu balance es menor a 0, no podrás jugar." +
            "</div>",
        confirmButtonText: '¡Dejame Jugar!',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: '60%',
    });
}


function recompensas() {
    Swal.fire({
        title: 'RECOMPENSAS',
        html: "<div style='text-align: center;'>" +
            "Esta son las recompensas que puedes obtener:" +
            "<h3>Numero de recámaras restantes:</h3>" +
            "1. 5 recamaras restantes: 0.2x" +
            "<br>2. 4 recámaras restantes: 0.4x" +
            "<br>3. 3 recámaras restantes: 1x" +
            "<br>4. 2 recámaras restantes: 1.5x" +
            "<br>5. 1 recámara restante: 2x" +
            "</div>",
        confirmButtonText: 'Salir',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
    });
}