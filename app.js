mapboxgl.accessToken = 'pk.eyJ1IjoibXJicm93bjM1Nzc1MyIsImEiOiJjbDJkaWkwdW8wMDR2M2pwY3N1dW9lZjMxIn0.uxOUN6yYTNNLkopgEPvHBw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

function successLocation(position)
{
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation()
{

}

function setupMap(center)
{
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: center,
    zoom: 16
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
    new MapboxDirections({
    accessToken: 'pk.eyJ1IjoibXJicm93bjM1Nzc1MyIsImEiOiJjbDJkaWkwdW8wMDR2M2pwY3N1dW9lZjMxIn0.uxOUN6yYTNNLkopgEPvHBw'
    }),
    'top-left'
    );

    const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [73.02419,19.04695]
            },
            properties: {
              title: 'Bus Stop',
              description: 'LP Bus Stop'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [73.02445,19.04587]
            },
            properties: {
              title: 'Bus Stop',
              description: 'DY PATIL Bus Stop'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [73.02302579655598, 19.044382161565384]
            },
            properties: {
              title: 'Bus Stop',
              description: 'CST Bus Stop'
            }
          }
        ]
    };

    // add markers to map
    for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
      )
    .addTo(map);
    
    }


      
    
}

