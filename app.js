
//map bounds
 var southWest = L.latLng(-120, -120),
 northEast = L.latLng(220, 220);
 bounds = L.latLngBounds(southWest, northEast);


 //Map implementation
 var map = L.map("map",{
    crs: L.CRS.Simple,
    minZoom: 2,
    maxZoom: 20,
    zoomControl: false,
    maxBounds: bounds,
    rotate: true, 
    touchRotate: false,
    rotateControl: {
      closeOnZeroBearing: false,
      position: "topright",
      
    },
    bearing: 0,


  });

  L.control
  .zoom({
    position: "topright",
  })
  .addTo(map);

  var bounds = [
    [1, 1],
    [100, 100],
  ];
  

  var image = L.imageOverlay("asset/map6.png", bounds).addTo(map);

  map.setView([9.875, 31.25], 5);

  map.attributionControl.setPrefix('')

// Search data


var plamar = L.icon({
  iconUrl: 'asset/plamar.png',

  iconSize:     [0, 0], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  
});

var markersLayer = new L.LayerGroup();	//layer contain searched elements
	
map.addLayer(markersLayer);

var controlSearch = new L.Control.Search({		
  layer: markersLayer,
  initial: false,
  zoom: 5,
  marker: false
});

map.addControl( controlSearch );

////////////populate map with markers from sample data
for(i in data) {
  var title = data[i].title,	//value searched
    loc = data[i].loc,		//position found
    marker = new L.Marker(new L.latLng(loc), {title: title, icon: plamar});//se property searched
    
  markersLayer.addLayer(marker);
}


//direction data
function RouteIn()
{
  for(let i = 0; i < results.length; i++)
  {
    if(results[i] == "a")
    {
      pointss.push(placepoints[0])
    }
    if(results[i] == "b")
    {
      pointss.push(placepoints[1])
    }
    if(results[i] == "c")
    {
      pointss.push(placepoints[2])
    }
    if(results[i] == "d")
    {
      pointss.push(placepoints[3])
    }
    if(results[i] == "e")
    {
      pointss.push(placepoints[4])
    }
    if(results[i] == "f")
    {
      pointss.push(placepoints[5])
    }
    if(results[i] == "g")
    {
      pointss.push(placepoints[6])
    }
    if(results[i] == "h")
    {
      pointss.push(placepoints[7])
    }
    if(results[i] == "i")
    {
      pointss.push(placepoints[8])
    }
    if(results[i] == "j")
    {
      pointss.push(placepoints[9])
    }
    if(results[i] == "k")
    {
      pointss.push(placepoints[10])
    }
    if(results[i] == "l")
    {
      pointss.push(placepoints[11])
    }
    if(results[i] == "m")
    {
      pointss.push(placepoints[12])
    }
    if(results[i] == "n")
    {
      pointss.push(placepoints[13])
    }
    
  }
}
//directions
    

    // the given points array

    let pointss = [];

var mapdata = {a:{b:3},b:{a:2,c:1,d:3,g:1},c:{b:1},d:{e:1, b:3, i:1},e:{d:1,f:3,l:2.8},f:{l:1},g:{b:1,i:3,h:1},h:{g:1, j:3},i:{d:1, j:1},j:{k:0.5,h:3, i:1},k:{j:0.5},l:{f:1,m:0.3, e:2.8},m:{l:0.3}},
			    graph = new Graph(mapdata);
var polyline;
var circle;
var flag = 0;
var Route = [];
var results;

function direct() {
  pointss = [];
  Route.forEach(function (item) {
    map.removeLayer(item)
    });
  if (!document.getElementById("from-starting").value || !document.getElementById("to-end").value) return;
  var sourceNode = document.getElementById("from-starting").value;
  var targetNode = document.getElementById("to-end").value;
  results = graph.findShortestPath(sourceNode, targetNode).toString();
  console.log(results);
  RouteIn();
  console.log(pointss);

  // iterate through the points to dynamically create the elements
  for(let i = 0; i < pointss.length; i++)
  {

      // every point creates a circle (node)
      // every pair of adjacent points creates an edge, 
      // other logic can be implemented
      if(i + 1 < pointss.length){
         polyline =  L.polyline.antPath([pointss[i],pointss[i+1]], {
          "delay": 70,
          "dashArray": [
             50,
            40
          ],
          "weight": 10,
          "color": "white",
          "pulseColor": "#0068FF",
          "hardwareAccelerated": true
        });
        polyline.addTo(map);
        Route.push(polyline);
      }
      circle = L.circle(pointss[i], {radius: 0.3, fill: true, fillOpacity: 1, fillColor: 'white'}).addTo(map);
      Route.push(circle);

      map.setView(pointss[i], map.getZoom(), {
        "animate": true,
        "pan": {
          "duration": 2
        },
      });

  };
  flag = 1;
  console.log(flag);
  document.getElementById("myForm").classList.toggle("show");



}



function resetDirect() {
  Route.forEach(function (item) {
    map.removeLayer(item)
    });
  flag = 0;
  console.log(flag);
  document.getElementById("from-starting").value = 0;
  document.getElementById("to-end").value = 0;
  document.getElementById("myForm").classList.toggle("show");
  }
function openForm() {
  document.getElementById("myForm").classList.toggle("show");
  document.getElementById('DirectBut').style.zIndex = 999;
}
function Close() {
  document.getElementById("from-starting").value = 0;
  document.getElementById("to-end").value = 0;
  document.getElementById("myForm").classList.toggle("show");
}

  
var marker12 = L.marker([ 0,0 ], {draggable: true}).addTo(map);
marker12.bindPopup('');

marker12.on('dragend', function(ev) {
 marker12.getPopup().setContent(marker12.getLatLng().toString()).openOn(map);
});

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
  }
}

L.geoJSON(places, {
  onEachFeature: onEachFeature
}).addTo(map);


/*$.getJSON('mapdata/places.json', function (geojson) {
  L.geoJson(geojson, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.popupContent);
    }
  }).addTo(map);
});



// geolocation
/*map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
  alert(e.message);
}
map.on('locationerror', onLocationError);-->*/

//locator
                                                                                                            
/*
L.LabelOverlay = L.Layer.extend({
    //initialize: function(/*LatLng*/ //latLng, /*String*/ label, options) {
        /*this._latlng = latLng;
        this._label = label;
        L.Util.setOptions(this, options);
    },
    options: {
        offset: new L.Point(15, 40)
    },
    onAdd: function(map) {
        this._map = map;
        if (!this._container) {
            this._initLayout();
        }
        map.getPanes().popupPane.appendChild(this._container);
        this._container.innerHTML = this._label;
        map.on('movestart', this._update_start, this);
        map.on('moveend', this._update_end, this);
        this._update_end();
    },
    onRemove: function(map) {
        map.getPanes().popupPane.removeChild(this._container);
        map.off('movestart', this._update_start, this);
        map.off('moveend', this._update_end, this);
    },
    _update_start: function(){
        L.DomUtil.setPosition(this._container, 0);
    },
    _update_end: function() {
        var pos = this._map.latLngToLayerPoint(this._latlng);
        var op = new L.Point(pos.x + this.options.offset.x, pos.y - this.options.offset.y);
        L.DomUtil.setPosition(this._container, op);
    },
    _initLayout: function() {
        this._container = L.DomUtil.create('div', 'leaflet-label-overlay');
    }
});   


var labelLocation = new L.LatLng(19.40625, 47.4375);
    var labelTitle = new L.LabelOverlay(labelLocation, '<b>Library</b>');
    map.addLayer(labelTitle);

    var labelLocation2 = new L.LatLng(60.6875, 29.875);
    var labelTitle2 = new L.LabelOverlay(labelLocation2, '<b>BSIT Building</b>');
    map.addLayer(labelTitle2);

    // In order to prevent the text labels to "jump" when zooming in and out,
    // in Google Chrome, I added this event handler:

    map.on('movestart', function () {
        map.removeLayer(labelTitle);
        map.removeLayer(labelTitle2);
    });
    map.on('moveend', function () {
        map.addLayer(labelTitle);
        map.addLayer(labelTitle2);
    });
*/

