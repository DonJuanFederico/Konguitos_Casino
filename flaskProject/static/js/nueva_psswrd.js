const numerosCodigo = document.querySelectorAll('.numeros');
const contenedorVer = document.getElementById('containerVerificacion');
const contenedorPw = document.getElementById('nuevaPw');
const primeraPw = document.getElementById('primera');
const segundaPw = document.getElementById('segunda');

numerosCodigo.forEach((input, index) => {
    input.addEventListener('keyup', function (event) {
        const current = this.value.replace(/[^0-9]/g, '');
        this.value = current;

        if (current.length === 1) {
            const nextElem = input.nextElementSibling;
            if (nextElem && typeof nextElem.focus === 'function') {
                nextElem.focus();
            }
        } else if (current.length === 0 && index > 0 && event.key === 'Backspace') {
            // Retroceso: Si la longitud es 0 y hay un elemento anterior, hacer focus en el elemento anterior
            const prevElem = input.previousElementSibling;
            if (prevElem && typeof prevElem.focus === 'function') {
                prevElem.focus();
                prevElem.value = ''; // Borrar el valor del elemento anterior
            }
        }
    });
});

function verificarContrasena(){
    contenedorVer.style.display = 'none';
    contenedorPw.style.display = 'flex';
}

function comprobarContrasena(){
    if(primeraPw.value === segundaPw.value && primeraPw.value !== ''){
        contenedorVer.style.display = 'flex';
        contenedorPw.style.display = 'none';
    } else{
        alert('Las contraseñas no coiciden');
    }
}