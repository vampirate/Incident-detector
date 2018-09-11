var IOTPostcode;

var pubnub = new PubNub({
  publishKey: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribeKey: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe",
  ssl: true
});

$.get('/api/getPostcode', function (data, WURFL) {
  console.log(data);
  IOTPostcode = data;
  renderMap(data.lat, data.lon);
  bindEvents();
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
  $('#new-user').click(function () {
    $.get('/api/getPostcode', function (data, WURFL) {
      console.log(data);
      IOTPostcode = data;
      renderMap(data.lat, data.lon);
      bindEvents();
      showInfoOnPage(data);
    });
  });
}

function renderMap(lat, lon) {
  var map;

  function initialize() {
    var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(lat, lon),
      disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize());
  var LatLng = new google.maps.LatLng(lat, lon);
  var myMarker = new google.maps.Marker({
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