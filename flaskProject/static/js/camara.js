document.addEventListener("DOMContentLoaded", function () {
            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const snapButton = document.getElementById('snap');

            // Obtener acceso a la cámara
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.error('Error accessing the camera: ', error);
                });

            // Capturar una foto y mostrar en el canvas
            snapButton.addEventListener('click', function () {
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                video.pause();
                video.srcObject.getVideoTracks().forEach(track => track.stop());
                video.style.display = 'none';
                canvas.style.display = 'block';
            });

            // Función para enviar el formulario (puedes personalizarla según tus necesidades)
            window.submitForm = function () {
                // Aquí puedes agregar lógica para enviar el formulario
                // Por ejemplo, puedes crear un FormData y enviarlo mediante una petición AJAX
                const formData = new FormData(document.getElementById('msform'));
                console.log('Form data:', formData);

                // Después de enviar el formulario, puedes redirigir al usuario a otra página o realizar otras acciones
            };
        });