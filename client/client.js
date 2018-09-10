var IOTPostcode;

function doSomethingInterestingWithPostcode(data) {
  //This is such a lazy way to do this. Here you would call a function that does 
  $('#postcode').text('Postcode: ' + data.postcode);
  $('#suburb').text('Suburb: ' + data.suburb);
  $('#lat').text('Lat: ' + data.lat);
  $('#lon').text('Lon: ' + data.lon);
  $('#location').text(data.suburb + ", NSW " + data.postcode);

  var lat = data.lat;
  var lon = data.lon;
}

var Device = navigator.platform;
console.log("device is " + Device);

var pubnub = PUBNUB.init({
  publish_key: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
  subscribe_key: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe"
});

// subscribe to the channel, and render all messages as markers on the map
function sendToPubNub(colour) {
  if (colour != 'clear') {
    IOTPostcode.colour = colour;
    IOTPostcode.clear = '';
  } else {
    IOTPostcode.clear = 'clear';
    IOTPostcode.colour = '';
  }
  IOTPostcode.device = Device;
  pubnub.publish({
    channel: 'leontest1',
    message: IOTPostcode
  });
  console.log('Will set postcode', IOTPostcode, 'to', colour);
  //here, send something to pub nub (IOTPostcode) is the postcode object that will have been set by now.
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




//This runs when the page loads.
//$.get makes an AJAX request to that URL. Node handles this with the app.get('/api/getPostcode'... code and returns a data object.
$.get('/api/getPostcode', function (data, WURFL) {
  console.log(data); //You can check this out in the Chrome console.
  //console.log("Browser Type = " + ua);
  console.log("Data lat = " + data.lat);
  IOTPostcode = data;
  doSomethingInterestingWithPostcode(data);
  renderMap(data.lat, data.lon);
  bindEvents();
});