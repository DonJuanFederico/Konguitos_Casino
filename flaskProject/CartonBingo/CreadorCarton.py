import random

class CreadorCarton:
    def generar_carton(self):
        # Definir los arrays con los números en cada rango
        array_1_9 = list(range(1, 10))
        array_10_19 = list(range(10, 20))
        array_20_29 = list(range(20, 30))
        array_30_39 = list(range(30, 40))
        array_40_49 = list(range(40, 50))
        array_50_59 = list(range(50, 60))
        array_60_69 = list(range(60, 70))
        array_70_79 = list(range(70, 80))
        array_80_90 = list(range(80, 91))  # El último valor es 91 para incluir el 90

        # Crear una lista de los arrays
        arrays = [
            array_1_9,
            array_10_19,
            array_20_29,
            array_30_39,
            array_40_49,
            array_50_59,
            array_60_69,
            array_70_79,
            array_80_90
        ]

        # Generar el cartón de bingo
        carton = []
        for _ in range(3):  # Generar 3 filas
            fila = []
            columnas_elegidas = random.sample(range(1, 10), 5)
            columnas_elegidas.sort()
            for columna in range(1, 10):
                if columna in columnas_elegidas:
                    numero_elegido = random.choice(arrays[columna-1])
                    arrays[columna - 1].remove(numero_elegido)
                    carton.append(numero_elegido)
                else:
                    carton.append("")
        return carton

