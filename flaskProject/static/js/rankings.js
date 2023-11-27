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


/*
document.addEventListener('DOMContentLoaded', function () {
    // Referencia a la tabla
    var tabla = document.getElementById('mi-tabla');

    // Realizar solicitud al servidor para obtener datos usando Flask
    fetch('/obtener_datos')  // Reemplaza '/obtener_datos' con la ruta de tu endpoint Flask
        .then(response => response.json())
        .then(datos => {
            // Generar filas de datos dinámicamente
            var tbody = tabla.querySelector('tbody');
            datos.forEach(function (fila) {
                var tr = document.createElement('tr');
                tr.innerHTML = `<td>${fila.id}</td><td>${fila.nombre}</td><td>${fila.pais}</td><td>${fila.dinero}</td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
});
*/
// ---------------------------------------------------------------------------------------------------------------------
<!--
from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Ruta principal que renderiza la página HTML
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para obtener datos desde el servidor (simulados en este ejemplo)
@app.route('/obtener_datos')
def obtener_datos():
    datos = []
    for i in range(1, 51):
        fila = {
            'id': i,
            'nombre': f'Persona {i}',
            'pais': 'País ' + str(random.randint(1, 5)),
            'dinero': random.randint(100, 1000)
        }
        datos.append(fila)
    return jsonify(datos)

if __name__ == '__main__':
    app.run(debug=True)

-->