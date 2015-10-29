var drawMap = function() {
  // Create map and set view
 	map = L.map('#map').setView([37.09024, -95.712891], 4);

  // Create a tile layer variable using the appropriate url
  	var layer = L.tileLayer('https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FraXV3YSIsImEiOiJjaWZ4MjZqcTQzbHJtdTNtMjJzdm5lcG9tIn0.Bo6KigV9UiQoLiKA5_j22Q');
  // Add the layer to your map
 	layer.addTo(map);
}