import axios from 'axios';
// Donner un input sous la forme d'un tableau ["type", {options}]
// Le type doit être "events", "geojson", "categories" ou "layers"

function eventsFinder(input) {
  const defaultOptions = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/events',
    params: { status: 'open' },
    headers: { 'Content-Type': 'application/json' },
  };
  const options = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/events',
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

export default eventsFinder;
