# -*- coding: utf-8 -*-
import requests
import sys
import time
from datetime import date
import numpy as np
import psycopg2


connection = psycopg2.connect( host ='localhost', database='datos', user='pi', password='postgres')
#Buscamos el día para la descarga de los horarios
cursor = connection.cursor()
cursor.execute('SELECT lat FROM pizero.localizacion WHERE id=1;')
lat = cursor.fetchone()[0]
cursor.execute('SELECT long FROM pizero.localizacion WHERE id=1;')
longitud = cursor.fetchone()[0]
cursor.close()
coordenadas = str(lat)+'_'+str(longitud)

f = open('/home/pi/python/coordenadas.txt','w')
f.write(coordenadas)
f.close()

