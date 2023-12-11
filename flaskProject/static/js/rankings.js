document.addEventListener('DOMContentLoaded', function () {
    // Referencia a la tabla
    var tabla = document.getElementById('mi-tabla');

    // Datos simulados
    var datosSimulados = [];
    for (var i = 1; i <= 50; i++) {
        var fila = {
            'posicion': i,
            'nombre': 'Persona ' + i,
            'pais': 'País ' + String.fromCharCode(65 + Math.floor(Math.random() * 5)),
            'dinero': Math.floor(Math.random() * 1000) + 100
        };
        datosSimulados.push(fila);
    }

    // Generar filas de datos dinámicamente
    var tbody = tabla.querySelector('tbody');
    datosSimulados.forEach(function (fila) {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${fila.posicion}</td><td>${fila.nombre}</td><td>${fila.pais}</td><td>${fila.dinero}</td>`;
        tbody.appendChild(tr);
    });
});

// funcion para ir a la ventana de atras (obtengo la url anterior y voy a ella)
let prevUrl = document.referrer;
function volverAtras(){
    if(prevUrl.indexOf(window.location.host) !== -1) {
    // Ir a la página anterior
    window.history.back();
    }
}