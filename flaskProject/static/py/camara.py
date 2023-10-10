import cv2

def tomarFoto(path):
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error al abrir la cámara")
    else:
        # Configurar las dimensiones de captura
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 420)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 360)

    ret, frame = cap.read()
    if ret:
        # Guardar la imagen capturada en la ruta deseada
        cv2.imwrite(path, frame)
        print(f"Imagen guardada en {path}")

            # Mostrar la imagen
        cv2.imshow('Imagen Capturada', frame)
        cv2.waitKey(0)  # Esperar hasta que se presione una tecla
        cv2.destroyAllWindows()  # Cerrar la ventana
    else:
        print("Error al capturar imagen")
        cv2.imwrite(path, frame)
        # Liberar la cámara
    cap.release()