import axios from 'axios';
// Donner un input sous la forme d'une string "categorie".

function layersFinder(input) {
  //   const defaultOptions = {
  //     method: 'GET',
  //     url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/layers',
  //     params: { status: 'open' },
  //     headers: { 'Content-Type': 'application/json' },
  //   };
  const options = {
    method: 'GET',
    url: `https://eonet.sci.gsfc.nasa.gov/api/v3/layers/${input}`,
    headers: { 'Content-Type': 'application/json' },
  };
  const eventsList = [];

  //   if (input[1].params && input[1].params !== {}) {
  //     options.params = input[1].params;
  //   } else {
  //     options.params = defaultOptions.params;
  //   }
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

export default layersFinder;
