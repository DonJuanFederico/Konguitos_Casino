function reglas(){
        Swal.fire({
            title: 'REGLAS',
            html: "<div style='text-align: center;'>" +
                "<h4>1. El objetivo del juego es conseguir una puntuación mayor que tu rival</h4>" +
                "<br><h4>2. Tienes 3 tiradas para lograrlo</h4>" +
                "<br><h4>3. Después de cada tirada, tienes la opción de quedarte con los dados que quieras y solo se tirarán los restantes</h4>" +
                "<br><h4>4. Cuando ambos jugadores terminan sus tres tiradas, se comparan resultados</h4>" +
                "<li><strong>Victora: duplicas el dinero apostado</li>" +
                "<li><strong>Empate: se compara el valor de los dados que componen la jugada. Por ejemplo, una pareja de 6s gana frente a una pareja de 4s. Recuperas tu apuesta solo si ganaste dicha comparación</li>" +
                "<br><h4>Si desea ver los valores de cada mano, haga click en el botón 'Puntuaciones'</h4>" +
                "</div>",
            confirmButtonText: '¡Vamos a jugar!',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }

    //Alerta de Recompensas
function puntuaciones() {
        Swal.fire({
            title: 'PUNTUACIONES',
            html: "<div style='text-align: center;'>" +
                "<br>Estas son todas las manos de mejor a peor:<br>" +
                "<br><h3>Repóker: 5 dados iguales</h4>" +
                "<h3>Póker: 4 dados iguales</h3>" +
                "<h3>Full: Trío y pareja</h3>" +
                "<h3>Escalera mayor: A-K-Q-J-8</h3>" +
                "<h3>Escalera menor: K-Q-J-8-7</h3>" +
                "<h3>Trío: 3 dados iguales</h3>" +
                "<h3>Doble pareja: 2 parejas</h3>" +
                "<h3>Pareja: 2 dados iguales</h3>" +
                "<h3></h3>" +
                "</div>",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }