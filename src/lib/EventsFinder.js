import axios from 'axios';
// Donner un input sous la forme d'un objet {field: "events", params:{clé: "valeur"}, categorie:"categorie"}.
// Pour events, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour geoJson, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour categories, les paramètres sont : source, status, limit, days.

function eventsFinder(input) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  if (input.field === 'events') {
    options.url = 'https://eonet.sci.gsfc.nasa.gov/api/v3/events';
    if (input.params && input.params !== {}) {
      options.params = input.params;
    }
    return axios.request(options).then((response) => response.data.events);
  }
  if (input.field === 'geoJson') {
    options.url = 'https://eonet.sci.gsfc.nasa.gov/api/v3/events/geojson';
    if (input.params && input.params !== {}) {
      options.params = input.params;
    }
    return axios.request(options).then((response) => response.data.features);
  }
  if (input.field === 'categories') {
    options.url = `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${input.categorie}`;
    if (input.params && input.params !== {}) {
      options.params = input.params;
    }
    return axios.request(options).then((response) => response.data.events);
  }
  if (input.field === 'layers') {
    options.url = `https://eonet.sci.gsfc.nasa.gov/api/v3/layers/${input.categorie}`;
    return axios.request(options).then((response) => response.data.categories);
  }
  return 'Something went wrong.';
}

export default eventsFinder;
