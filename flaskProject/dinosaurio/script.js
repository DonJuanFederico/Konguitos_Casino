document.addEventListener('DOMContentLoaded', function() {
    const imagen = document.getElementById('imagen');
    let numeroImagen = 1;
    let incremento = 1;
    let tiempoFrame = 110;

    setInterval(function() {
        imagen.src = `Corriendo${numeroImagen}.png`;
        
        if (numeroImagen === 5) {
            incremento = -1;
        } else if (numeroImagen === 1) {
            incremento = 1;
        }

        numeroImagen += incremento;
    }, tiempoFrame);

    let body = document.querySelector('body');

    function moverFondo() {
        
        let posicionActual = parseInt(getComputedStyle(body).backgroundPositionX, 10);
        body.style.backgroundPositionX = (posicionActual - 10) + 'px';
        requestAnimationFrame(moverFondo);
    }

    moverFondo();
});
