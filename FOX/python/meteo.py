# -*- coding: utf-8 -*-
import requests
import sys
import time
from datetime import date
import numpy as np
import psycopg2


connection = psycopg2.connect( host ='192.168.1.37', database='datos', user='postgres', password='postgres')
#Obtenemos los datos 
cursor = connection.cursor()
cursor.execute('SELECT luz FROM datos_meteo.datos ORDER BY id desc;')
luz = cursor.fetchone()[0]
cursor.execute('SELECT temperatura FROM datos_meteo.datos ORDER BY id desc;')
temperatura = cursor.fetchone()[0]
cursor.execute('SELECT humedad FROM datos_meteo.datos ORDER BY id desc;')
humedad = cursor.fetchone()[0]
cursor.execute('SELECT humo FROM datos_meteo.datos ORDER BY id desc;')
humo = cursor.fetchone()[0]
cursor.execute('SELECT gas_co FROM datos_meteo.datos ORDER BY id desc;')
gas_co = cursor.fetchone()[0]
cursor.execute('SELECT gas_lpg FROM datos_meteo.datos ORDER BY id desc;')
gas_lpg = cursor.fetchone()[0]
cursor.close()
gas = (humo + gas_co + gas_lpg)/3
meteo = str(luz)+'&'+str(100-luz)+'&'+str(temperatura)+'&'+str(100-temperatura)+'&'+str(humedad)+'&'+str(100-humedad)+'&'+str(gas)+'&'+str(100-gas)+'&'+str(temperatura)
f = open('/home/pi/python/meteo.txt','w')
f.write(meteo)
f.close()
