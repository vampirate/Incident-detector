var weatherJson;

var getWeather = function() {
    var sky;
    var temp;
    var humidity;
    const apiKey = "fa583b3fd490451806d9365adc9e302c";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log("Got weather response");
            weatherJson = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=fa583b3fd490451806d9365adc9e302c`,
        false);
    xhttp.send();
}

var showWeather = function (getWeather) {
    getWeather();
    console.log("Showing weather");
    sky = JSON.stringify(weatherJson.weather[0].description);
    temp = parseFloat(JSON.stringify(weatherJson.main.temp - 273.15)).toFixed(1);
    humidity = JSON.stringify(weatherJson.main.humidity);
    var weatherLog = `The temperature is ${temp} Celcius, humidity is ${humidity}, ${sky}`;
    console.log(weatherJson);
    alert(weatherLog);
}