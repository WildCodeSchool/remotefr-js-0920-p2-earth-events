import axios from 'axios';
// Donner un input sous la forme d'un objet {field: "events", params:{clé: "valeur"}, categorie:"categorie", id:"EONET_0000"}. Seul le premier est requis.
// Pour events, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour geoJson, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.
// Pour categories, les paramètres sont : source, status, limit, days.

function eonet(input) {
  const instance = axios.create({
    baseURL: 'https://eonet.sci.gsfc.nasa.gov/api/v3',
    headers: { 'Content-Type': 'application/json' },
  });
  const options = {};
  if (input.params && Object.keys(input.params).length > 0) {
    options.params = input.params;
  }

  if (input.field === 'events') {
    if (input.id) {
      options.url = `/events/${input.id}`;
    } else {
      options.url = '/events';
    }
    return instance
      .get(options.url, options.params)
      .then((response) => response.data);
  }
  if (input.field === 'geoJson') {
    if (input.id) {
      options.url = `/events/${input.id}/geojson`;
    } else {
      options.url = '/events/geojson';
    }
    return instance
      .get(options.url, options.params)
      .then((response) => response.data);
  }
  if (input.field === 'categories') {
    options.url = `/categories/${input.categorie}`;
    return instance
      .get(options.url, options.params)
      .then((response) => response.data.events);
  }
  if (input.field === 'layers') {
    options.url = `/layers/${input.categorie}`;
    return instance
      .get(options.url, options.params)
      .then((response) => response.data.categories);
  }
  return Promise.reject(new Error('Something went wrong (bad parameters)'));
}

export default eonet;
