var weatherJson;
var weatherFlag = true;

var getWeather = function () {
    const apiKey = "fa583b3fd490451806d9365adc9e302c";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            //console.log("Got weather response");
            weatherJson = JSON.parse(this.responseText);
            temp = parseFloat(JSON.stringify(weatherJson.main.temp - 273.15)).toFixed(1);
            //console.log("temp is " + temp)
        }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`,
        false);
    xhttp.send();
}


var showWeather = function (getWeather) {
    sky = weatherJson.weather[0].description;
    tempForecase = parseFloat(JSON.stringify(weatherJson.main.temp - 273.15)).toFixed(1);
    humidity = JSON.stringify(weatherJson.main.humidity);
    $('#weather').text(`The temperature is ${temp} Celcius, humidity is ${humidity}, ${sky}`);
}