function reglas(){
        Swal.fire({
            title: 'REGLAS',
            html: "<div style='text-align: center;'>" +
                "<h4>1. Para comenzar, elige una de las apuestas principales e introduce la cantidad deseada</h4>" +
                "<li><strong>Línea de Pase:</strong> Ganas si sale un 7 u 11 en el lanzamiento inicial. Pierdes si sale un 2, 3 o 12. Si sale otro número se establece como punto y ganas si se repite antes de un 7.</li>" +
                "<li><strong>Barra de No Pase:</strong> Ganas si sale un 2 o un 3 en el lanzamiento inicial. Pierdes si sale un 7 u 11. Empatas si sale un 12. Si se establece un punto, ganas si sale un 7 antes de repetirlo.</li>" +
                "<br><h4>2. Si se estableció un punto, antes de volver a tirar tienes la opción de comenzar una apuesta secundaria de forma paralela</h4>" +
                "<li><strong>Gabela a Favor:</strong> Requiere una Línea de Pase como apuesta principal. Ganas si el punto establecido se repite antes de un 7.</li>" +
                "<li><strong>Gabela en Contra:</strong> Requiere una Barra de No Pase como apuesta principal. Ganas si sale un 7 antes de que se repita el punto.</li>" +
                "<br><h4>Si desea ver los valores de cada apuesta, haga click en el botón 'Recompensas'</h4>" +
                "</div>",
            confirmButtonText: '¡Vamos a jugar!',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }

    //Alerta de Recompensas
function recompensas() {
        Swal.fire({
            title: 'RECOMPENSAS',
            html: "<div style='text-align: center;'>" +
                "Esta son las recompensas que puedes obtener" +
                "<h3>Apuestas Principales:</h3>" +
                "<h4>Línea de Pase:</h4>" +
                "7 u 11 inicial = 1:1" +
                "<br>Victoria por punto = 1:1" +
                "<h4>Barra de no Pase:</h4>" +
                "2 o 3 inicial = 1:1" +
                "<br>Victoria por punto = 1:1" +
                "<h3>Apuestas Secundarias:</h3>" +
                "<h4>Gabela a Favor:</h4>" +
                "Con punto 4 o 10 = 2:1" +
                "<br>Con punto 5 o 9 = 3:2" +
                "<br>Con punto 6 u 8 = 6:5" +
                "<h4>Gabela en Contra:</h4>" +
                "Con punto 4 o 10 = 0.5:1" +
                "<br>Con punto 5 o 9 = 0.66:1" +
                "<br>Con punto 6 u 8 = 0.83:1" +
                "</div>",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }