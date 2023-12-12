function reglas(){
        Swal.fire({
            title: 'REGLAS',
            html: "<div style='text-align: center;'>" +
                " Bievenido al mejor blackjack existente" +
                "<h3>REGLAS:</h3>" +
                "1. Para jugar, introduce la cantidad que quieres apostar." +
                "<br>2. Primero reparte las cartas." +
                "<br>3. Te saldrá un mensaje diciendo tu puntuación." +
                "<br>3. Si quieres pedir otra carta porque crees que puedes acercarte más a 21 dale a Pedir Carta." +
                "<br>4. Si crees que ya tienes suficiente dale a Plantarse." +
                "<br>5. Si te pasas de 21, pierdes." +
                "<br>6. Si te plantas, el dealer robará cartas hasta que se pase de 17." +
                "<br>7. Si el dealer se pasa de 21, ganas." +
                "<br>8. Si el dealer tiene más puntos que tú, pierdes." +
                "<br>9. Si tienes más puntos que el dealer, ganas." +
                "<br>10. Si tienes los mismos puntos que el dealer, empate." +
                "<br> <br>" +
                "<h3>Normas a tener en cuenta:</h3>" +
                "Si ganas, se te sumará el premio a tu balance." +
                "<br>Si pierdes, se te restará la apuesta a tu balance." +
                "<br>Si tu balance es menor a la apuesta, no podrás jugar." +
                "<br>Si tu apuesta es menor o igual a 0, no podrás jugar." +
                "<br>Si tu balance es menor a 0, no podrás jugar." +
                "</div>",
            confirmButtonText: '¡Dejame Jugar!',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            width: '50%',
        });
    }

    //Alerta de Recompensas
function recompensas() {
        Swal.fire({
            title: 'RECOMPENSAS',
            html: "<div style='text-align: center;'>" +
                "<h3>Facil y sencillo:</h3>" +
                "<br>Si ganas te llevas un x2 de lo apostado</br>" +
                "<br>Si pierdes, pierdes lo apostado</br>" +
                "</div>",
            confirmButtonText: 'QUIERO DINERO',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }