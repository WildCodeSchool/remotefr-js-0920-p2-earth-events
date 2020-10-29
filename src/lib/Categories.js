import axios from 'axios';
// Donner un input sous la forme d'un tableau ["categorie", {params:{clé: "valeur"}].
// Pour categories, les paramètres sont : source, status, limit, days.

function categoriesFinder(input) {
  const options = {
    method: 'GET',
    url: `https://eonet.sci.gsfc.nasa.gov/api/v3/categories/${input[0]}`,
    params: {},
    headers: { 'Content-Type': 'application/json' },
  };

  const eventsList = [];
  const object = input[1];

  if (object && object !== {}) {
    options.params = object;
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
