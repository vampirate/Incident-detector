var IOTPostcode;
var lat = -33.8688;
var lng = 151.2093;

var pubnub = new PubNub({
  publishKey: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe",
  ssl: true
});



$.get('/api/getPostcode', function (data, WURFL) {
  bindEvents();
  console.log(data);
  IOTPostcode = data;
  lat = data.lat;
  lng = data.lon;
  renderMap(lat, lng);
  showInfoOnPage(data);
});

function sendToPubNub(colour) {
  IOTPostcode.colour = colour;
  IOTPostcode.device = Device;

  pubnub.publish({
      message: {
        such: IOTPostcode
      },
      channel: 'IoT channel 1',
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
        console.log("message Published, will set postcode", IOTPostcode, " to ", colour)
      }
    }
  );
}

pubnub.subscribe({
  channels: ["IoT channel 1"],
});

function bindEvents() {
  //Bind some events
  $('#set-low').click(function () {
    sendToPubNub('Green');
  });
  $('#set-med').click(function () {
    sendToPubNub('Orange');
  });
  $('#set-high').click(function () {
    sendToPubNub('Red');
  });
  $('#set-clear').click(function () {
    sendToPubNub('Clear');
  });
  $('#new-user').click(function () {
    console.log("GETTING NEW LOCATION!");
    $.get('/api/getPostcode', function (data, WURFL) {
      IOTPostcode = data;
      lat = data.lat;
      lng = data.lon;
      renderMap(lat, lng);
      showInfoOnPage(data);
    });
  });
}

function renderMap(lat, lon) {
  var map;

  function initMap() {
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(lat, lon)
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initMap());


  var LatLng = new google.maps.LatLng(lat, lon);
  var marker = new google.maps.Marker({
    position: LatLng,
    animation: google.maps.Animation.DROP,
    map: map
  });

}

function showInfoOnPage(data) {
  $('#location').text(data.suburb + ", NSW " + data.postcode);
}

var Device = navigator.platform;
console.log("The device sending the request is " + Device);