var mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
var map = L.map('map').setView([17.385044, 78.486671], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
    maxZoom: 18
}).addTo(map);

var taxiIcon = L.icon({
    iconUrl: 'images/vehicle.png',
    iconSize: [70, 70]
});

var marker = L.marker([17.385044, 78.486671], { icon: taxiIcon }).addTo(map);

map.on('click', function (e) {
    console.log(e);
    var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(17.385044, 78.486671),
            L.latLng(e.latlng.lat, e.latlng.lng)
        ]
    }).on('routesfound', function (e) {
        var routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
            setTimeout(function () {
                marker.setLatLng([coord.lat, coord.lng]);
            }, 100 * index);
        });
    }).addTo(map);
});
