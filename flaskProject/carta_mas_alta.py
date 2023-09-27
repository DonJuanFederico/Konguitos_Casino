from random import random, choice

# creamos la baraja francesa para poder jugar (usamos una sola baraja)
baraja = sum(list(map( lambda n: [str(n)+' ♠',str(n)+' ♣',str(n)+' ♥',str(n)+' ♦'], ['A','J','Q','K',2,3,4,5,6,7,8,9,10])),[])

# cojer una carta aleatoria
    # para la banca:
croupier_card = choice(baraja)
baraja.remove(croupier_card)
#print("----------------------------------\nEl crupier tiene la carta: ", croupier_card)

    # cartas para el jugador:
mano = []                                          # son las diferentes cartes de donde puede escoger el jugador una carta
for i in range(3):                                 # el jugador recibe 3 cartas
    mano.append(choice(baraja))

#print("Soy el jugador y tengo las cartas: ", mano) # las cartas de donde puede elegir una el jugador
print("----------------------------------")

# metodo para que el jugador pueda elegir una carta
def carta_jugada():
    decision = int(input("Elija un carta con la que jugar: \nSi quiere escoger la primera escriba '1', "
                     "si quiere la segunda escriba '2' y si quiere la tercera la '3'.\n"))
    if(decision == 1):
        del mano[1:3]           # eliminamos las otras opciones no cogidas
    elif(decision == 2):
        mano.pop(0)
        mano.pop(1)
    elif(decision == 3):
        del mano[0:2]
    else:
        print("Eres un perro y te pasas de verga, responde bien\n")

# comparamos la carta del crupier con la del jugador
def comparacion():
    carta_1 = croupier_card.split(' ')
    #print("La carta del crupier es :", carta_1[0])
    carta_2 = mano[0].split(' ')
    #print("La carta del jugador es :", carta_2[0])

# cambiamos los valores de las letras para la comparacion    CAMBIARLO A UN SWITCH
    if(str(carta_1[0]) == 'A'):
        carta_1[0] = 14
    elif (str(carta_1[0]) == 'K'):
        carta_1[0] = 13
    elif (str(carta_1[0]) == 'Q'):
        carta_1[0] = 12
    elif (str(carta_1[0]) == 'J'):
        carta_1[0] = 11

    if (str(carta_2[0]) == 'A'):
        carta_2[0] = 14
    elif (str(carta_2[0]) == 'K'):
        carta_2[0] = 13
    elif (str(carta_2[0]) == 'Q'):
        carta_2[0] = 12
    elif (str(carta_2[0]) == 'J'):
        carta_2[0] = 11

    print("Las otras cartas eran: \n")
    print("Crupier: ", str(croupier_card) + ", Jugador: ", str(mano[0]))

# comparamos las cartas
    if(int(carta_1[0]) == int(carta_2[0])):
        print("Ha habido un empate y no se pierde dinero\n")            # ¿pierde algo el jugador?
    elif(int(carta_1[0]) > int(carta_2[0])):
        print("Ha ganado a la banca, lo sentimos... Pruebe otra vez\n")
    elif(int(carta_1[0]) < int(carta_2[0])):
        print("HAS GANADO!!!! ENHORABUENA\n")

# llamamos a los metodos para poder jugar
carta_jugada()
comparacion()


# codigo para ejecutar el programa flask --->  flask --app principio --debug run
# principio es el nombre del programa a ejecutar