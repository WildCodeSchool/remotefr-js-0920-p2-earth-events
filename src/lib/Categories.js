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

  const object = input[1];

  if (object && object !== {}) {
    options.params = object;
  }
  return axios.request(options).then((response) => response.data.events);
}

export default categoriesFinder;
