var map;
var markers = [];
var defaultLat = -33.8688
var defaultLng = 151.2093
var defaultLatLng = new google.maps.LatLng(defaultLat, defaultLng);

function initMap() {
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(defaultLat, defaultLng)
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initMap);

function placeMarker(m) {
    var LatLng = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: m.colour,
            fillOpacity: 0.4,
            strokeWeight: 1,
        },
        position: LatLng,
        map: map
    });

    markers.push(marker);
    var contentString = `${suburb}, NSW, ${postcode}<br>Code: ${colour}<br>Device temp: ${temp} C, Pressure: ${pressure} Pa, Photoelectric: ${photo} mV`;
    var infowindow = new google.maps.InfoWindow({
        content: `${contentString}<br>`
    });

    marker.addListener('click', function () {
        map.setZoom(7);
        map.setCenter(marker.getPosition());
        infowindow.open(map, marker);
        window.setTimeout(function () {
            infowindow.close();
        }, 3000);
    });
}

function eraseAllMarkers() {
    setMapOnAll(null);
    markers = [];
    pop.play();
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}