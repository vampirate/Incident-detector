var pubnub = new PubNub({
    publishKey: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
    subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe",
    ssl: true
})

var postcode
var suburb
var suburbData
var state
var latitude
var longitude
var hour 
var min
var time

var temp

var pressure = 0
var photo = 0
var names = "compooter"
var colour = "Green"
var device 

if (navigator.userAgent.includes("Mac")) {
    device = "Mac"
} else if (navigator.userAgent.includes("Iphone")) {
    device = "iPhone"
} else {
    device = "Windows"
}

console.log("device is " + device)

function send() {
    hour = (new Date()).getHours()
    min = +(new Date()).getMinutes()
    time = `${hour}${min}`
    temp = temp * 100
    pubnub.publish({
            message: {
                "postcode": `${postcode}`,
                "suburb": `${suburb}`,
                "state": `${state}`,
                "lat": `${latitude}`,
                "lon": `${longitude}`,
                "time": `${time}`,
                "temp": `${temp}`,
                "pressure": `${pressure}`,
                "photo": `${photo}`,
                "names": `${names}`,
                "colour": `${colour}`,
                "device": `${device}`
            },
            channel: 'iot',
            sendByPost: false, // true to send via post
            storeInHistory: false, //override default storage options
            meta: {
                "cool": "meta"
            } // publish extra meta with the request
        },

        function (status, response) {
            if (status.error) {
                // handle error
                console.log(status)
            } else {
                console.log("sent to pubnub")
            }
        }
    )

}

var getSuburbFromJson = function () {
    $.ajaxSetup({
        async: false
    });

    $.getJSON("./static/NSWLATLON.json", function (data) {
        var count = Math.floor(Math.random() * data.length)
        postcode = data[count].postcode;
        suburb = data[count].suburb;
        state = data[count].state;
        latitude = data[count].lat;
        longitude = data[count].lon;
    });
}

var showIncident = function (getSuburbFromJson) {
    document.getElementById("postcode").value = postcode
    document.getElementById("suburb").value = suburb
    document.getElementById("state").value = state
    document.getElementById("lat").value = latitude
    document.getElementById("lon").value = longitude
    document.getElementById("temp").value = temp
}

function getNewIncident() {
    getSuburbFromJson()
    getWeather()
    showIncident()
}