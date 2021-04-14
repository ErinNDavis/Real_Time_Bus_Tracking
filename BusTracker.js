//---------------------------------------------------------------------------------------
// This array contains the coordinates for all bus stops between MIT and Harvard
//---------------------------------------------------------------------------------------
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

//---------------------------------------------------------------------------------------
//creates map and school markers
//---------------------------------------------------------------------------------------
mapboxgl.accessToken = 'pk.eyJ1IjoibmVidWxhZW4iLCJhIjoiY2tuZGlkYmdzMWZzYjJ2bWxuaDd3ZzBjNSJ9.xQPKfiKV10bz-m4qMyUNsw';

let map = new mapboxgl.Map({ //creates map 
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 13,
});

//geojson data for MIT and Harvard locations
let geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.0942, 42.3601]
    },
    properties: {
      title: 'Mapbox',
      description: 'MIT campus'
    }
  },
  {
    type: 'Feature',
    geometry:{
      type: 'Point',
      coordinates: [-71.1167, 42.3770]
    },
    properties: {
      title: 'Mapbox',
      description: 'Harvard campus'
    }
  }]
};

//creates school markers and binds popups to those markers
geojson.features.forEach(function(marker){
  let el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
      .setHTML('<h3>' + marker.properties.description + '</h3>')
    )
    .addTo(map);
});

//----------------------------------------------------------------------------------------
// Tracks buses upon client click
//---------------------------------------------------------------------------------------
function tracker(){

  async function run(){
    // get bus data    
    let locations = await getBusLocations();
    console.log(locations);

    locations.forEach(function(bus){
      let el = document.createElement('div');
      el.className = 'bus';

      new mapboxgl.Marker(el)
        .setLngLat([-71.05812,42.34137])
        //.setPopup(new mapboxgl.Popup({offset: 25})
        //  .setHTML('<h3>' + bus.id + '</h3>')
        //)
        .addTo(map);
    })
    setTimeout(run, 15000);
  }

  // Request bus data from MBTA
  async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
  }

  run();
  }
  //---------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// display bus stops upon client click
//---------------------------------------------------------------------------------------

let mapMarkers = []

function move(){
  for (let i = 0; i < busStops.length; i++){
    let markers = "marker" + i;
    markers = new mapboxgl.Marker()
      .setLngLat(busStops[i])
      .addTo(map);
    mapMarkers.push(markers);
  }
}




