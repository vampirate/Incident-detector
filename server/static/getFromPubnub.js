var appleCounter = 0;
var androidCounter = 0;
var windowsCounter = 0;
var otherCounter = 0;
var pop = new Audio("static/sound/pop.mp3");
var ping = new Audio("static/sound/ping.mp3");
var m;

var pubnub = new PubNub({
    subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe",
    ssl: true
});

pubnub.subscribe({
    channels: ["IoT channel 1"],
});
        
pubnub.addListener({
    message: function (msg) {
        m = msg.message.such;
        // get the lat and lon from the message body m.lat and m.lon

        var LatLng = new google.maps.LatLng(m.lat, m.lon);
        // sound effect
        var mySound;
        if (m.colour == 'Clear') {
            pop.play();
        } else {
            ping.play();
        }

        if (m.postcode) {
            placeMarker(m);
        }

        //now increment device counts
        var device = m.device;
        if (device == 'MacIntel') {
            appleCounter++;
        } else if (device == 'iPhone') {
            androidCounter++;
        } else if (device == 'iPad') {
            appleCounter++;
        } else if (device == 'android') {
            androidCounter++
        } else if (device == 'Android') {
            androidCounter++
        } else if (device == 'Linux armv7l') {
            androidCounter++
        } else if (device == 'windows') {
            windowsCounter++
        } else if (device == 'Windows') {
            windowsCounter++
        } else if (device == 'Win32') {
            windowsCounter++
        } else if (device == 'Win64') {
            windowsCounter++
        } else {
            otherCounter++;
        }

        $('#apple-counter').text(appleCounter);
        $('#android-counter').text(androidCounter);
        $('#windows-counter').text(windowsCounter);
        $('#other-counter').text(otherCounter);
        $("#push-data2").text(appleCounter)
        $('#location').text(m.suburb + ", NSW " + m.postcode);
        sky = m.weather.weather[0].description
        temp = parseFloat(JSON.stringify(m.weather.main.temp - 273.15)).toFixed(1);
        humidity = JSON.stringify(m.weather.main.humidity);
        weatherLog = `The temperature is ${temp} Celcius, humidity is ${humidity}, ${sky}`;
        $('#weather').text(`The temperature is ${temp} Celcius, humidity is ${humidity}, ${sky}`);
        $("#push-data").remove();
        
    }
})