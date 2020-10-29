import axios from 'axios';
// Donner un input sous la forme d'une string "categorie".

function layersFinder(input) {
  const options = {
    method: 'GET',
    url: `https://eonet.sci.gsfc.nasa.gov/api/v3/layers/${input}`,
    headers: { 'Content-Type': 'application/json' },
  };

  return axios.request(options).then((response) => response.data.categories);
}

export default layersFinder;
