import axios from 'axios';
// Donner un input sous la forme d'un objet {params:{clé: "valeur"}}.
// Pour events, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.

function eventsFinder(input) {
  const options = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/events',
    params: {},
    headers: { 'Content-Type': 'application/json' },
  };

  if (input && input !== {}) {
    options.params = input;
  }

  return axios.request(options).then((response) => response.data.events);
}

export default eventsFinder;
