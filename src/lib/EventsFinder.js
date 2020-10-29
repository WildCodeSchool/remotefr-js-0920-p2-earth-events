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
  const eventsList = [];

  if (input && input !== {}) {
    options.params = input;
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
