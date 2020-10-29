import axios from 'axios';
// Donner un input sous la forme d'un objet.
// La clé "params" doit avoir une valeur sous la forme d'un objet.
// Pour GeoJson, les paramètres sont : source, status, limit, days, start, end, magID, magMin, magMax, bbox.

function geoFinder(input) {
  const defaultOptions = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/geojson',
    params: { status: 'open' },
    headers: { 'Content-Type': 'application/json' },
  };
  const options = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/geojson',
    params: {},
    headers: { 'Content-Type': 'application/json' },
  };
  const eventsList = [];

  if (input.params && input.params !== {}) {
    options.params = input.params;
  } else {
    options.params = defaultOptions.params;
  }
  function getEvents(obj) {
    axios
      .request(obj)
      .then((response) => response.data.events)
      .then((events) => {
        for (let i = 0; i < events.length; i += 1) {
          eventsList.push(events[i]);
        }
      });
  }
  getEvents(options);
  return eventsList;
}

export default geoFinder;
