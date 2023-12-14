window.onload = function() {
    let premio_slots = localStorage.getItem('premio_slots');

    if (premio_slots>100) {
        document.getElementById("progresoSlots").innerHTML = "100%";
    }
}