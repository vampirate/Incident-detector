var IOTPostcode;

var pubnub = new PubNub({
  publishKey: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe",
  ssl: true
});

//This runs when the page loads.
//$.get makes an AJAX request to that URL. Node handles this with the app.get('/api/getPostcode'... code and returns a data object.
$.get('/api/getPostcode', function (data, WURFL) {
  console.log(data); //You can check this out in the Chrome console.
  //console.log("Browser Type = " + ua);
  console.log("Data lat = " + data.lat);
  IOTPostcode = data;
  var lat = data.lat;
  var lon = data.lon;
  renderMap(data.lat, data.lon);
  bindEvents();
  doSomethingInterestingWithPostcode(data);
});

// subscribe to the channel, and render all messages as markers on the map
function sendToPubNub(colour) {
  IOTPostcode.colour = colour;
  IOTPostcode.device = Device;

  pubnub.subscribe({
    channels: ['leontest1'],
  });

  pubnub.publish({
      message: {
        such: IOTPostcode
      },
      channel: 'leontest1',
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

function bindEvents() {
  //Bind some events
  $('#set-low').click(function () {
    console.log("green");
    sendToPubNub('green');
  });
  $('#set-med').click(function () {
    sendToPubNub('orange');
  });
  $('#set-high').click(function () {
    sendToPubNub('red');
  });
  $('#set-clear').click(function () {
    sendToPubNub('clear');
  });
}

function renderMap(lat, lon) {
  var map;

  function initialize() {
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(lat, lon),
      disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize());
  var LatLng = new google.maps.LatLng(lat, lon);
  var myMarker = new google.maps.Marker({
    position: LatLng,
    animation: google.maps.Animation.DROP,
    map: map
  });
}

function doSomethingInterestingWithPostcode(data) {
  $('#postcode').text('Postcode: ' + data.postcode);
  $('#suburb').text('Suburb: ' + data.suburb);
  $('#lat').text('Lat: ' + data.lat);
  $('#lon').text('Lon: ' + data.lon);
  $('#location').text(data.suburb + ", NSW " + data.postcode);
}

var Device = navigator.platform;
console.log("The device sending the request is " + Device);