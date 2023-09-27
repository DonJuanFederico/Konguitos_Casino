from random import random, choice

# creamos la baraja francesa para poder jugar (usamos una sola baraja)
baraja = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
palos = ['♠', '♣', '♥', '♦']
figuras = baraja[0:16] # cojo las figuras de la baraja

# cojer una carta aleatoria
    # para la banca:
croupier_card = choice(baraja)
#print("----------------------------------\nEl crupier tiene la carta: ", croupier_card)

    # cartas para el jugador:

mano = []                                          # son las diferentes cartes de donde puede escoger el jugador una carta
for i in range(3):                                 # el jugador recibe 3 cartas
    mano.append(choice(baraja))
cartas_user = mano.copy()

#print("Soy el jugador y tengo las cartas: ", mano) # las cartas de donde puede elegir una el jugador
print("----------------------------------")

# metodo para que el jugador pueda elegir una carta
def carta_jugada():
    decision = int(input("Elija un carta con la que jugar: \nSi quiere escoger la primera escriba '1', "
                     "si quiere la segunda escriba '2' y si quiere la tercera la '3'.\n"))
    if (decision == 1):
        del mano[1:3]  # eliminamos las otras opciones no cogidas
    elif (decision == 2):
        mano.pop(0)
        mano.pop(1)
    elif (decision == 3):
        del mano[0:2]
    else:
        print("Eres un perro y te pasas de verga, responde bien\n")

def comparacion():
    if(baraja.index(croupier_card) == baraja.index(mano[0])):
        print("Ha habido un empate y no se pierde dinero\n")
    if(baraja.index(croupier_card) > baraja.index(mano[0])):
        print("Ha ganado a la banca, lo sentimos... Pruebe otra vez\n")
    if (baraja.index(croupier_card) < baraja.index(mano[0])):
        print("HAS GANADO!!!! ENHORABUENA\n")

def poner_palos(croupier_card = croupier_card):
# lista de cartas q hay en la baraja para saber q no cojo 2 iguales
    reserva = sum(list(map(lambda n: [str(n) + ' ♠', str(n) + ' ♣', str(n) + ' ♥', str(n) + ' ♦'],
                           ['A', 'J', 'Q', 'K', 2, 3, 4, 5, 6, 7, 8, 9, 10])), [])
    carta_1 = (str(croupier_card) + ' ' + choice(palos))
    for i in reserva:
        if(i == carta_1):
            croupier_card = i
            reserva.remove(i)
    carta_2 = (str(mano[0]) + ' ' + choice(palos))
    for i in reserva:
        if (i == carta_2):
            mano[0] = i
            reserva.remove(i)

    print("Croupier: ", carta_1 + ", Jugador: ", carta_2)   
    print("Las opciones del jugador reveladas eran: ", cartas_user)

# llamamos a los metodos para poder jugar
carta_jugada()
comparacion()
poner_palos()


# codigo para ejecutar el programa flask --->  flask --app principio --debug run
# principio es el nombre del programa a ejecutar