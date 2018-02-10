import PyPDF2
from cStringIO import StringIO
horas = []
hora = []
pdf_file = open('/home/pi/PDF/metrohorario.pdf','rb')
read_pdf = PyPDF2.PdfFileReader(pdf_file,strict=False)
number_of_pages = read_pdf.getNumPages()
page = read_pdf.getPage(0)
page_content = page.extractText()
data = page_content.split()
data_horario = data[38].split('Rafelbunyol')
data_horas = data_horario[1].split('---')
for i in data_horas :
    if i != '':
        horas.append(i)
#con horas tenemos todas las horas unidas
horario = ''
for a in horas:
    horario =''
    dos_puntos = a.index(':')
    datos_separados = ''.join(str(e) for e in a)
    a = 0
    for letra in datos_separados:
        if letra == ':':
            horario = horario +' '+ datos_separados[a-2:a+3]
        a=a+1
    hora.append(horario+'&')

f = open('/home/pi/python/metro_horario.txt','w')
for horas_metro in hora:
    f.write(horas_metro+'\n')
f.close()


#print hora
#con hora tenemos todas las horas con los primeros dos puntos
