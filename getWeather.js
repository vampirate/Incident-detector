function getWeather() {
    var weather;
    var sky;
    var temp;
    var humidity;
    const apiKey = "fa583b3fd490451806d9365adc9e302c";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            responseJson = JSON.parse(this.responseText);
            weather = JSON.stringify(responseJson.weather);
            sky = JSON.stringify(responseJson.weather[0].description);
            temp = parseFloat(JSON.stringify(responseJson.main.temp - 273.15)).toFixed(1);
            humidity = JSON.stringify(responseJson.main.humidity);
            console.log(`${sky}, the temperature is ${temp} Celcius, and the humidity is ${humidity}`);
            var weatherLog = `${sky}, the temperature is ${temp} Celcius, and the humidity is ${humidity}`;
            alert(weatherLog);
        }
    };
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=fa583b3fd490451806d9365adc9e302c",
        true);
    xhttp.send();
}
