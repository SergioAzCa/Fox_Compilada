
window.chartColors = {
  red: 'rgb(219, 10, 10)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(32,35,219)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  white: 'rgb(255,255,255)'
};
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};
var texto_centro = '18ºC';
var chartColors = window.chartColors;
var color = Chart.helpers.color;
var config = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [90.5,0,0,0,0.5],
            borderWidth: [
                  0,0,0,0,0,0
              ],
            backgroundColor: [
              color(chartColors.yellow).alpha(1).rgbString(),
              color(chartColors.red).alpha(1).rgbString(),
              color(chartColors.blue).alpha(1).rgbString(),
              color(chartColors.green).alpha(1).rgbString(),

            ]
        },{
            data: [0,60,0,0,40],
            borderWidth: [
                  0,0,0,0,0,0
              ],
            backgroundColor: [
              "rgba(0,0,0,0)",
              color(chartColors.red).alpha(1).rgbString(),
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)"
            ]
        },{
            data: [0,0,30,0,70],
            borderWidth: [
                  0,0,0,0,0,0
              ],
            backgroundColor: [
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              color(chartColors.blue).alpha(1).rgbString(),
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)"
            ]
        },{
            data: [0,0,0,90,10],
            borderWidth: [
                  0,0,0,0,0
              ],
            backgroundColor: [
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              color(chartColors.green).alpha(1).rgbString(),
              "rgba(0,0,0,0)",
            ]
        }],
        labels: [
            "Luz",
            "Temperatura",
            "Humedad",
            "Gas"
        ]
    },
    options: {
      elements: {

            center: {
                // the longest text that could appear in the center
                maxText: '100%',
                text: texto_centro,
                fontColor: color(chartColors.white).alpha(1).rgbString(),
                fontFamily : 'Arial',
                fontStyle: 'bold',
                fontSize: 20,
                minFontSize: 1,
                maxFontSize: 256,
            }
        },
        responsive: true,
        //rotation: 1 * Math.PI,
        //circumference: 1 * Math.PI,
        cutoutPercentage: 40,
        legend: {
            position: 'right',
            labels: {
                      fontColor : '#FFFFFF',
                      fontSize	: 15
                    }
        },
        title: {
            display: true,
            text: 'FOX METEO',
            fontSize	: 30,
            fontColor : '#FFFFFF',
            fontFamily: 'sans-serif'
        },
        tooltips: {
                enabled: false
            }
    }
};


/////TEXTO EN MEDIO DEL GRAFICO
Chart.pluginService.register({
    afterUpdate: function (chart) {
        if (chart.config.options.elements.center) {
            var helpers = Chart.helpers;
            var centerConfig = chart.config.options.elements.center;
            var globalConfig = Chart.defaults.global;
            var ctx = chart.chart.ctx;

            var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

            if (centerConfig.fontSize)
                var fontSize = centerConfig.fontSize;
                // figure out the best font size, if one is not specified
            else {
                ctx.save();
                var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                do {
                    ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                    var textWidth = ctx.measureText(maxText).width;

                    // check if it fits, is within configured limits and that we are not simply toggling back and forth
                    if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                        fontSize += 1;
                    else {
                        // reverse last step
                        fontSize -= 1;
                        break;
                    }
                } while (true)
                ctx.restore();
            }

            // save properties
            chart.center = {
                font: helpers.fontString(fontSize, fontStyle, fontFamily),
                fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
        }
    },
    afterDraw: function (chart) {
        if (chart.center) {
            var centerConfig = chart.config.options.elements.center;
            var ctx = chart.chart.ctx;

            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText(centerConfig.text, centerX, centerY);
            ctx.restore();
        }
    },
})

window.onload = function() {
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myDoughnut = new Chart(ctx, config);
    recarga_grafico();
};

//////////////AJAX
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                return allText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function datos_meteo(){
		  var response = readTextFile('/home/pi/python/meteo.txt');
      //var response = '87&13&24.0&76.0&43.900002&56.099998&70&30&24.0';
		  //console.log(response)
			var resultado = response.split('&');
			//console.log(resultado)
      var luz = resultado[0];
      var resto_luz = resultado[1];
			var temperatura = resultado[2];
      var resto_temperatura = resultado[3];
			var humedad = resultado[4];
      var resto_humedad = resultado[5];
      var gas = resultado[6];
      var resto_gas = resultado[7];
      var texto_centro_1 = round(resultado[8], 2);
      var temperatura_centro = texto_centro_1+'ºC';
      window.myDoughnut.data.datasets[0].data[0]= luz;
      window.myDoughnut.data.datasets[0].data[4]= resto_luz;
      window.myDoughnut.data.datasets[1].data[1]= temperatura;
      window.myDoughnut.data.datasets[1].data[4]= resto_temperatura;
      window.myDoughnut.data.datasets[2].data[2]= humedad;
      window.myDoughnut.data.datasets[2].data[4]= resto_humedad;
      window.myDoughnut.data.datasets[3].data[3]= gas;
      window.myDoughnut.data.datasets[3].data[4]= resto_gas;
      window.myDoughnut.options.elements.center.text = temperatura_centro;
      window.myDoughnut.update();
}


///ACTUALIZACION DE DATOS
function recarga_grafico (){
    var a = setInterval(function(){
    datos_meteo();
    recarga_grafico();
  },900000); //Set interval para que se refresque cada 15 min
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
