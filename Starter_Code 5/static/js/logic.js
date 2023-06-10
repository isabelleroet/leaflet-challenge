let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"

d3.json(url).then(function (data) {
    function styleInfo(feature){
        return{opacity: 1, fillOpacity: 1, fillColor: mapColor(feature.geometry.coordinates[2]), color: "#000000", weight: 0.5, radius: getMag(feature.properties.mag)}  

}  

//coolors for personalized color palettes 
function mapColor(depth){switch(true){case depth > 90: return "#ea2c2c"; case depth > 70: return "#ea822c"; case depth > 50: return "#ee9c00"; case depth > 30: return "#eecc00"; case depth > 10: return "#d4ee00"; default: return "#98ee00"}}
function getMag(magnitude){if(magnitude == 0){return 1}return magnitude * 2.5}
L.geoJson(data, { pointToLayer: function (feature, coords) { return L.circleMarker(coords) }, style: styleInfo, onEachFeature: function(feature, layer){layer.bindPopup("magnitude " + feature.properties.mag + "<br>" + "depth " + feature.geometry.coordinates[2] + "<br>" + feature.properties.place)}}).addTo(map) })

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with options.
let map = L.map("map", {
    center: [40.73, -94],
    zoom: 3,
    layers: [streetmap]
});

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: #ea2c2c"></i><span>> 90</span><br>';
  div.innerHTML += '<i style="background: #ea822c"></i><span>> 70</span><br>';
  div.innerHTML += '<i style="background: #ee9c00"></i><span>>50</span><br>';
  div.innerHTML += '<i style="background: #eecc00"></i><span>>30</span><br>';
  div.innerHTML += '<i style="background: #d4ee00"></i><span>>10</span><br>';
  div.innerHTML += '<i style="background: #98ee00"></i><span><10</span><br>';

  

  return div;
};

legend.addTo(map);
