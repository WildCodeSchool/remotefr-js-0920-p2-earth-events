import axios from 'axios';
// Donner un input sous la forme d'un objet {field: "events", params:{clé: "valeur"}, categorie:"categorie"}.
// Pour events, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour geoJson, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour categories, les paramètres sont : source, status, limit, days.

function eventsFinder(input) {
  const instance = axios.create({
    baseURL: 'https://eonet.sci.gsfc.nasa.gov/api/v3',
    headers: { 'Content-Type': 'application/json' },
  });
  const options = {};

  if (input.field === 'events') {
    options.url = '/events';
    if (input.params && Object.keys(input.params).length > 0) {
      options.params = input.params;
    }
    return instance.get(options).then((response) => response.data.events);
  }
  if (input.field === 'geoJson') {
    options.url = '/events/geojson';
    if (input.params && Object.keys(input.params).length > 0) {
      options.params = input.params;
    }
    return instance.get(options).then((response) => response.data.features);
  }
  if (input.field === 'categories') {
    options.url = `/categories/${input.categorie}`;
    if (input.params && Object.keys(input.params).length > 0) {
      options.params = input.params;
    }
    return instance.get(options).then((response) => response.data.events);
  }
  if (input.field === 'layers') {
    options.url = `/layers/${input.categorie}`;
    return instance.get(options).then((response) => response.data.categories);
  }
  return Promise.resolve('Something went wrong (bad parameters)');
}

export default eventsFinder;
