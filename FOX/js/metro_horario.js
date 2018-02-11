////FUNCION Y VARIABLES PARA METRO VALENCIA
calcularhorario()
recarga_metro();



function calcularhorario() {
	var horas_siguiente ;
	var horas_ahora;
	var hora_metro= [];
	var f=new Date();
	var hora_actual=f.getHours()+"."+f.getMinutes();
	var hora_siguiente=(f.getHours()+2)+"."+f.getMinutes();
	var hora_comparar =0+f.getHours();
	var hora_busqueda=f.getHours()+":";
	var hora_busqueda_fin_siguiente=f.getHours() + 1;
	var horario_metro = [];
	var texto_horario = "";
  var b = 0;
	var response = readTextFile('/home/pi/python/metro_horario.txt');
	var resultado = response.split('&');
	var hora_final = resultado[texto_bueno.length-1];
	var hora_inicio_buena = resultado[0];
	for (var i=0;i< resultado.length;i++){
				var valor_hora = resultado[i];
				if(valor_hora != ""){
					var horas_horario = valor_hora.split(' ');
				}
				for (var a=0;a< horas_horario.length;a++){
						var numero = horas_horario[a].replace(':','.');
						if ( parseFloat(hora_actual)  < parseFloat(numero) && parseFloat(hora_siguiente) > parseFloat(numero) ){
							texto_horario = texto_horario +' '+numero
							//console.log(texto_horario)
						}
				}
	}

	if (hora_actual > hora_final){
		$("#metro").html(
			"<div '><img style='right=100px;' src='svg/train-travelling-on-railroad.svg' height='30'/> Ya no hay metros disponibles hasta las " + hora_inicio_buena + "</div>"
		);
	}else {
		$("#metro").html(
			"<div '><img style='right=100px;' src='svg/train-travelling-on-railroad.svg' height='30'/> Horario : " + texto_horario + "</div>"
		);};
};



function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
            	//console.log(rawFile.responseText)
                allText = rawFile.responseText;
                return allText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function recarga_metro (){
    var a = setInterval(function(){
    calcularhorario();
    recarga_metro();
  },90000); //Set interval para que se refresque cada 15 min
}
