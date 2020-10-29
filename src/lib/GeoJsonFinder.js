import axios from 'axios';
// Donner un input sous la forme d'un objet {params:{clé: "valeur"}}.
// Pour GeoJson, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.

function geoFinder(input) {
  const options = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/geojson',
    params: {},
    headers: { 'Content-Type': 'application/json' },
  };

  if (input && input !== {}) {
    options.params = input;
  }

  return axios.request(options).then((response) => response.data.features);
}

export default geoFinder;
