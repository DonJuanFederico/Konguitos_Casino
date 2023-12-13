function sumarIncremento() {
    fetch("/sumar_valor", { method: "POST" });
}

function resetear() {
    fetch("/resetear_valor", { method: "POST" })
        .then(response => {
            if (response.ok) {
                actualizarValor(); // Actualizar valor después de resetear
            } else {
                throw new Error('Error al resetear el valor');
            }
        })
        .catch(error => console.error("Error:", error));
}

// Función para realizar la solicitud AJAX y actualizar el valor en el DOM
function actualizarValor() {
    fetch("/obtener_valor_actualizado")
        .then(response => response.json())
        .then(data => {
            document.getElementById("valor-numero").textContent = data.valor_actualizado;
        })
        .catch(error => console.error("Error:", error));
}

// Llamar a la función para actualizar el valor cada medio segundo
setInterval(actualizarValor, 500);
 // 500 milisegundos = medio segundo