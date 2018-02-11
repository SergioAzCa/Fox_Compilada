
//Variables globales
var lat ;
var long;
var allText;
//METRO VALENCIA
// LAT LONG : 39.573050699999996 -0.32989759999999996

//PETICION PDF
//http://www.metrovalencia.es/horarios_pdf.php?origen=3&destino=11&fecha=12/11/2017&hini=00:00&hfin=23:59

 lat,long= lat_long();
  weatherReport(lat,long);
  //weatherReport(39.573050699999996,-0.32989759999999996); //CUANDO ESTE LA RASPI ACTIVA DESCOMENTAR ARRIBA
  google_calendar();
  //calcularhorario();
  recarga();

//----------------------------------------------------------------------------
//RELOJ DIGITAL
$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
var dayNames= ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]

// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);

setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);

setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours();
	// Add a leading zero to the hours value
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
}, 1000);
});

//----------------------------------------------------------------------------
//FUNCION MEMORIA LIBERADA
function recarga (){
  var a = setInterval(function(){
    google_calendar();
    weatherReport(lat,long);
    clearInterval(a);
    recarga();
    //weatherReport(39.573050699999996,-0.32989759999999996);
  },900000);//Set interval para que se refresque cada 15 min
}

//----------------------------------------------------------------------------
//INICIO DE LAS FUNCIONES para el tiempo
function weatherReport(lat,long) {

	var apiKey       = '328d9ebcd87e9efeb1df8eaecc146730',
			url          = 'https://api.darksky.net/forecast/',
			lati         = lat,
			longi        = long,
			api_call     = url + apiKey + "/" + lat + "," + long+ "?lang=es&units=si&extend=hourly&callback=?";
			//console.log(api_call);
	// Hold our days of the week for reference later.
	var days = [];
	// Call to the DarkSky API to retrieve JSON
	$.getJSON(api_call, function(forecast) {
		//DIA ACTUAL
			  var date     = new Date(forecast.currently.time * 1000);
				var abreviatura = forecast.currently.summary;
				var skicons     = forecast.currently.icon;
				var tiempo     = forecast.currently.time;
				var viento     = Math.round((forecast.currently.windSpeed) * 3.6,1);
				var humidity = Math.round(forecast.currently.humidity * 100,1);
				var summary  = forecast.currently.summary;
				var temp    = forecast.currently.temperature;
				var aparente_temp = forecast.currently.apparentTemperature;
				var rocio = forecast.currently.dewPoint;
				var nubes = forecast.currently.cloudCover * 100;
				var uv = 	forecast.currently.uvIndex;
				var visibilidad = forecast.currently.visibility;
				//var ozono = forecast.currently.ozone;
				var probabilidad_lluvia= Math.round(forecast.currently.precipProbability * 100,1);
				var presion = forecast.currently.pressure;

		$("#tiempo").html(
					'<div class="shade-'+ skicons +'"><div class="card-container"><div><div class="front card"></div>' +
					"<div class='graphic_tiempo'><canvas class=" + skicons + "></canvas></div>" +
          "<div id='temp' style='float:left;margin-left:5px;' ><img src='./svg/thermometer_generico.svg' height='30'/> "  + temp + "</div>" +
					"<div id='probabilidad_lluvia_current'><img src='./svg/rain.svg' height='30'/>  "  + probabilidad_lluvia + "%</div>" +
					"<div id='aparente_temp'><b>Temperatura aparente</b>: " + aparente_temp + "</div>" +
					"<div id='humidity_current' style='float:left;margin-left:5px;'><img src='./svg/humidity.svg' height='30'/> " + humidity + "%</div>" +
          "<div id='viento_current' ><img src='./svg/windy.svg' height='30'/>  "  + viento + " Km/h</div>" +
          "<div><b>------Datos adicionales------</b></div>" +
					"<div id='rocio_current'><b>Rocio</b>: " + rocio + "</div>" +
					"<div id='nubes_current' style='float:left;margin-left:5px;'><img src='./svg/cloud_azul.svg' height='30'/> " + nubes + "%</div>" +
	        "<div id='uv_current' ><img src='./svg/sunblock.svg' height='30'/> " + uv + "</div>" +
          "<div id='presion_current' ><img src='./svg/meter.svg' height='30'/> " + presion + " Hectopascals</div>" +
					"<div id='visibilidad_current'><b>Visibilidad</b>: " + visibilidad + " Km</div>" +
					//"<div><b>Ozono</b>: " + ozono + "</div>" +
					'</div></div><div class="back card">'
		);
		// Bucle para los días
		for(var i = 1, l = forecast.daily.data.length; i < l - 1; i++) {

			    var date     = new Date(forecast.daily.data[i].time * 1000);
					var day      = days[date.getDay()];
					var skicons  = forecast.daily.data[i].icon;
					var time     = forecast.daily.data[i].time;
					var wind     = Math.round((forecast.daily.data[i].windSpeed)*3.6,1);
					var humidity = Math.round(forecast.daily.data[i].humidity * 100,1);
					var summary  = forecast.daily.data[i].summary;
	        var probabilidad_lluvia  = Math.round(forecast.daily.data[i].precipProbability * 100,1);
					//temp    = Math.round(forecast.hourly.data[i].temperature),
					var tempMin = Math.round(forecast.daily.data[i].temperatureLow);
					var tempMax = Math.round(forecast.daily.data[i].temperatureMax);
          var forecast_valor = ["#forecast1","#forecast2","#forecast3","#forecast4","#forecast5","#forecast6"];


  		$(forecast_valor[i-1]).html(
  			  "<div  class='contenedor_datos'>"+
  				'<div class="shade-'+ skicons +'">' +
  				"<div class='contCalend'><img src='svg/calendar.svg' height='30'/>  " + date.toLocaleDateString() + "</div>" +
  				"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
          "<div class='lineaIconosSup'>"+
  				"<div id = 'tempMin"i-1"' style='float:left;margin-left:5px;'><img src='svg/temperature_cold.svg' height='30'/> " + tempMin + "</div>" +
  				"<div id = 'tempMax"i-1"' style='float:left;margin-left:5px;'><img src='svg/temperature_hot.svg' height='30'/>  " + tempMax + "</div>" +
  				"<div id = 'humidity"i-1"' style='float:left;margin-left:5px;'><img src='svg/humidity.svg' height='30'/> " + humidity + "%</div>" +
  				"</div>"+
  				"<div class='lineaIconosInf'>"+
  				"<div id = 'probabilidad_lluvia"i-1"' style='float:left;margin-left:5px;'><img src='svg/rain.svg' height='30'/>  " + probabilidad_lluvia + "%</div>" +
  				"<div id = 'wind"i-1"' style='float:left;margin-left:5px;'><img src='svg/windy.svg' height='30'/>  " + wind + "Km/h</div>" +
  				"</div>"+
  				"</div>"+
  				'</div></div><div class="back card">'
  		);
		}
		skycons(); //Añadimos los iconos
	});
}


function weatherReport_carga(lat,long) {

	var apiKey       = '328d9ebcd87e9efeb1df8eaecc146730',
			url          = 'https://api.darksky.net/forecast/',
			lati         = lat,
			longi        = long,
			api_call     = url + apiKey + "/" + lat + "," + long+ "?lang=es&units=si&extend=hourly&callback=?";
			//console.log(api_call);
	// Hold our days of the week for reference later.
	var days = [];
	// Call to the DarkSky API to retrieve JSON
	$.getJSON(api_call, function(forecast) {
		//DIA ACTUAL
			  var date     = new Date(forecast.currently.time * 1000);
				var abreviatura = forecast.currently.summary;
				var skicons     = forecast.currently.icon;
				var tiempo     = forecast.currently.time;
				var viento     = Math.round((forecast.currently.windSpeed) * 3.6,1);
				var humidity = Math.round(forecast.currently.humidity * 100,1);
				var summary  = forecast.currently.summary;
				var temp    = forecast.currently.temperature;
				var aparente_temp = forecast.currently.apparentTemperature;
				var rocio = forecast.currently.dewPoint;
				var nubes = forecast.currently.cloudCover * 100;
				var uv = 	forecast.currently.uvIndex;
				var visibilidad = forecast.currently.visibility;
				//var ozono = forecast.currently.ozone;
				var probabilidad_lluvia= Math.round(forecast.currently.precipProbability * 100,1);
				var presion = forecast.currently.pressure;

        var shade_current = "shade-"+skicons;
        $("#shade_current").removeClass(shade_current);
        $("#shade_current").addClass(shade_current);
        $("#icon_curent").removeClass(skicons);
        $("#icon_curent").addClass(skicons);
        $("#temp").value(temp);
        $("#probabilidad_lluvia_current").value(probabilidad_lluvia);
        $("#aparente_temp").value(aparente_temp);
        $("#humidity_current").value(humidity);
        $("#viento_current").value(viento);
        $("#rocio_current").value(rocio);
        $("#nubes_current").value(nubes);
        $("#uv_current").value(uv);
        $("#presion_current").value(presion);
        $("#visibilidad_current").value(visibilidad);
		// Bucle para los días
		for(var i = 1, l = forecast.daily.data.length; i < l - 1; i++) {

			    var date     = new Date(forecast.daily.data[i].time * 1000);
					var day      = days[date.getDay()];
					var skicons  = forecast.daily.data[i].icon;
					var time     = forecast.daily.data[i].time;
					var wind     = Math.round((forecast.daily.data[i].windSpeed)*3.6,1);
					var humidity = Math.round(forecast.daily.data[i].humidity * 100,1);
					var summary  = forecast.daily.data[i].summary;
	        var probabilidad_lluvia  = Math.round(forecast.daily.data[i].precipProbability * 100,1);
					//temp    = Math.round(forecast.hourly.data[i].temperature),
					var tempMin = Math.round(forecast.daily.data[i].temperatureLow);
					var tempMax = Math.round(forecast.daily.data[i].temperatureMax);
          var forecast_valor = ["#forecast1","#forecast2","#forecast3","#forecast4","#forecast5","#forecast6"];

          var shade_current = "shade-"+skicons;
          $("#shade_current").removeClass(shade_current);
          $("#shade_current").addClass(shade_current);
          $("#icon").removeClass(skicons);
          $("#icon_curent").addClass(skicons);
          $("#temp").value(temp);
          $("#probabilidad_lluvia_current").value(probabilidad_lluvia);
          $("#aparente_temp").value(aparente_temp);
          $("#humidity_current").value(humidity);
          $("#viento_current").value(viento);
          $("#rocio_current").value(rocio);
          $("#nubes_current").value(nubes);
          $("#uv_current").value(uv);
          $("#presion_current").value(presion);
          $("#visibilidad_current").value(visibilidad);


		}
		skycons(); //Añadimos los iconos
	});
}

function skycons() {
        var i,
            icons = new Skycons({
               //"color" : "#190f707",
               "color" : "#FFFFFF",
                "resizeClear": true // nasty android hack
            }),
            list  = [ // listing of all possible icons
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ];
    // loop thru icon list array
    for(i = list.length; i--;) {
        var weatherType = list[i], // select each icon from list array
                // icons will have the name in the array above attached to the
                // canvas element as a class so let's hook into them.
                elements    = document.getElementsByClassName( weatherType );
        // loop thru the elements now and set them up
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
    }
    // animate the icons
    icons.play();
}

//////////////////////GOOGLE CALENDAR

//GET https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=50&key=AIzaSyD_zoIlbCLq_ZW9gjPa2Uq6nn18sX2e6Zo
//GET https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/serazca%40gmail.com/events?timeMax=2017-11-29T10%3A00%3A00-07%3A00&timeMin=2017-01-29T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax=2017-11-29T10%3A00%3A00-07%3A00&timeMin=2017-01-29T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
//https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU
function google_calendar(){

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //mes de 1 a 12 empieza en 0 de ahi el +1
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	fecha_ini = year + "-" + month + "-" + day;
	dia_siguiente = day + 7;
	if (dia_siguiente >= 27){
		var dia_siguiente = "01";
		if (month == 12){
			month = "01";
		}else {
			month = month + 1
		}
	}else {
		var dia_siguiente = day + 7;
	}
	fecha_fin = year + "-" + month + "-" + dia_siguiente;
	//request = "https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU";
	//console.log(request)
	//CALENDARIO CONJUNTO
	$.getJSON("https://www.googleapis.com/calendar/v3/calendars/m50vfeum9fh2k4464qcc72j014%40group.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU", function(calendar){
	   //console.log(calendar)
	   for(var i = 0, l = calendar.items.length; i < l ; i++) {

			evento = calendar.items[i].summary;
			empieza = calendar.items[i].start.dateTime;
			var particion_empieza = empieza.split("T");
			var particion_1 = particion_empieza[0];
			var hora_empieza = particion_1.split("-");
			var dia_empieza = hora_empieza[2];
			var mes_empieza = hora_empieza[1];
			var anyo_empieza = hora_empieza[0];
			var hora_empieza_real = dia_empieza+"-"+mes_empieza+"-"+anyo_empieza;
			acaba = calendar.items[i].end.dateTime;
			var particion_acaba = acaba.split("T");
			var particion_2 = particion_acaba[0];
			var hora_acaba = particion_2.split("-");
			var dia_acaba = hora_acaba[2];
			var mes_acaba = hora_acaba[1];
			var anyo_acaba = hora_acaba[0];
			var hora_acaba_real = dia_acaba+"-"+mes_acaba+"-"+anyo_acaba;
			if (hora_empieza_real == hora_acaba_real){
				hora_acaba_real ="";
			};

			$("#calendar").html(
			    "<div class='contenedor_calendar'>"+
				"<div style='float:left;margin-left:5px;'><img src='./svg/calendar_google.svg' height='30'/>  " + evento + "</div>" +
				"<div style='float:left;margin-left:5px;'> " + hora_empieza_real + "</div>" +
				"<div style='float:left;margin-left:5px;'> " + hora_acaba_real + "</div>" +
				"</div>"
			);
	   };
	});
	//CALENDARIO CUMPLEAÑOS
	$.getJSON("https://www.googleapis.com/calendar/v3/calendars/#contacts@group.v.calendar.google.com/events?timeMax="+String(fecha_fin)+"T10%3A00%3A00-07%3A00&timeMin="+String(fecha_ini)+"T10%3A00%3A00-07%3A00&key=AIzaSyDFNYWM5Xk33euOTjB88ztXM0ryYktJQLU", function(calendar){
	   //console.log(calendar);
	   for(var i = 0, l = calendar.items.length; i < l ; i++) {
   			evento = calendar.items[i].summary;
   			$("#cumples").html(
				    "<div class='contenedor_cumpleaños'>"+
					"<div style='float:left;margin-left:5px;'><img src='/svg/calendar_google.svg' height='30'/>  " + evento + "</div>" +
					"</div>"
			);
	   };
	});

}



//////////////AJAX
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

function lat_long(){
		    var response = readTextFile('/home/pi/python/coordenadas.txt');
		    //console.log(response)
			var resultado = response.split('_');
			//console.log(resultado)
			lat = resultado[0];
			long = resultado[1];
return lat,long;
}
