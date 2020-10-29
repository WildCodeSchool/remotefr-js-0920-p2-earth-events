import axios from 'axios';
// Donner un input sous la forme d'un tableau ["categorie", {objet}].
// La clé "params" doit avoir une valeur sous la forme d'un objet.
// Pour categories, les paramètres sont : source, status, limit, days.

function categoriesFinder(input) {
  const defaultOptions = {
    method: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/categories',
    params: { status: 'open' },
    headers: { 'Content-Type': 'application/json' },
  };
  const options = {
    method: 'GET',
    url: `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${input[0]}`,
    params: {},
    headers: { 'Content-Type': 'application/json' },
  };
  const eventsList = [];

  if (input[1].params && input[1].params !== {}) {
    options.params = input[1].params;
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

export default categoriesFinder;
