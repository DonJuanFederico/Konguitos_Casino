const numerosCodigo = document.querySelectorAll('.numeros');
const contenedorVer = document.getElementById('containerVerificacion');
const contenedorPw = document.getElementById('nuevaPw');
const requisitos = document.getElementById('requisitos');
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
    requisitos.style.display = 'flex';
}

function comprobarContrasena() {
    if(primeraPw.value === segundaPw.value && primeraPw.value !== '') {
        var requisitos = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (requisitos.test(segundaPw.value)) {
            /*var nuevaContrasena = $('#segunda').val();
            $.ajax({
                type: 'POST',
                url: '/Perfil_de_usuario/nueva_pw/',
                data: {
                    nuevaContrasena: nuevaContrasena
                },
                success: function (response) {
                    console.log(response.message);
                    // Puedes realizar acciones adicionales después de cambiar la contraseña
                },
                error: function (error) {
                    console.error(error);
                }
            });*/
            alert('EUREKAAAAA');
        } else {
            alert('La contraseña no cumple con los requisitos establecidos.');
        }
    } else if(primeraPw.value !== segundaPw.value){
        alert('Las contraseñas no coinciden.');
    } else {
        alert('Introduzca una contraseña valida.')
    }
    //window.location.href = '/Perfil_de_usuario/';
}

function mostrarRequisitos(){
    Swal.fire({
        title: 'Requisitos de contarseña',
        width: 600,
        height: 700,
        html: "<div>" +
            "<br><strong>1.</strong> Debe tener un mínimo de 8 caracteres." +
            "<br><strong>2.</strong> Debe contener al menos 1 letra mayúscula." +
            "<br><strong>3.</strong> Debe contener al menos 1 letra minúscula." +
            "<br><strong>4.</strong> Debe contener al menos 1 número." +
            "<br><strong>5.</strong> Debe contener al menos 1 de lo siguientes símbolos: @ $ ! % * ? &." +
            "</div>",
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'goldenrod',
        backdrop: `rgba(0,0,0,0.4)`,
        allowOutsideClick: true,
        allowEscapeKey: true,
        customClass: {
            confirmButton: 'custom-button',
            htmlContainer: 'custom-container'
          },
    });
}
