function reglas(event){
    event.preventDefault();
        Swal.fire({
            title: 'REGLAS',
            html: "<div style='text-align: center;'>" +
                " Bievenido al mejor tragaperras existente (No es para nada un timo)" +
                "<h3>REGLAS:</h3>" +
                "1. Para jugar, introduce la cantidad que quieres apostar." +
                "<br>2. Dale al Spin y GANA." +
                "<h5>Normas a tener en cuenta:</h5>" +
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
        });
    }

    //Alerta de Recompensas
function recompensas(event) {
    event.preventDefault();
        Swal.fire({
            title: 'RECOMPENSAS',
            html: "<div style='text-align: center;'>" +
                "Esta son las recompensas que puedes obtener:" +
                "<h3>Tres Iguales:</h3>" +
                "🍭🍭🍭 = x5" +
                "<br>🤡🤡🤡 = x7" +
                "<br>❌❌❌ = x7" +
                "<br>⛄️⛄️⛄️ = x7" +
                "<br>😒😒😒 = x7" +
                "<br>🙏🙏🙏 = x7" +
                "<br>🎅🎅🎅 = x7" +
                "<br>🧙🧙🧙 = x7" +
                "<br>🎁🎁🎁 = x50" +
                "<br>🤑🤑🤑 = x100" +
                "<br>💀💀💀 = x1000" +
                "<h3>Dos Iguales:</h3>" +
                "🍭🍭 = x1.5" +
                "<br>🤡🤡 = x2" +
                "<br>❌❌ = x2" +
                "<br>😒😒 = x2" +
                "<br>⛄️⛄️ = x2" +
                "<br>🙏🙏 = x2" +
                "<br>🎅🎅 = x3" +
                "<br>🧙🧙 = x3" +
                "<br>🎁🎁 = x5" +
                "<br>🤑🤑 = x10" +
                "<br>💀💀 = x25" +
                "</div>",
            confirmButtonText: 'Salir',
            confirmButtonColor: '#3085d6',
            backdrop: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
        });
    }