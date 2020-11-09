import React from 'react';
import L from 'leaflet';
import './CSS/map.css';

const lightMap = {
  tileLayer: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};
const darkMap = {
  tileLayer:
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
};
const satMap = {
  tileLayer:
    'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  attribution:
    '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
  bounds: [
    [-75, -180],
    [81, 180],
  ],
  minZoom: 2,
  maxZoom: 19,
  apikey: 'choisirgeoportail',
  format: 'image/jpeg',
  style: 'normal',
};

const pulsar = L.divIcon({ className: 'pulsar' });

// dummyMarkers à supprimer quand on aura des vrais évènements sur la carte
const dummyMarkers = [
  [45, 0],
  [35, 0],
  [55, 0],
  [45, 10],
  [45, -10],
];
// const eonetMarkers=[];

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'light map' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.map = L.map('wildmap').setView([45.184094, 0.716364], 6);
    L.tileLayer(this.mapPicker('tileLayer'), {
      attribution: this.mapPicker('attribution'),
      minZoom: 1,
      maxZoom: this.mapPicker('maxZoom'),
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiZmxvd3JhbiIsImEiOiJja2gweGV1bGkwMnFrMnhxeTRvbGVsdmJ2In0.PcExAwc7ssv0VbrNB_sbtg',
      bounds: [
        [-75, -180],
        [81, 180],
      ],
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal',
    }).addTo(this.map);
    dummyMarkers.forEach((dummyMarker) => {
      L.marker(dummyMarker, { icon: pulsar })
        .addTo(this.map)
        .bindPopup(`I'm an event at ${dummyMarker[0]} and ${dummyMarker[1]}`);
      console.log(dummyMarker);
    });
  }

  componentDidUpdate() {
    L.tileLayer(this.mapPicker('tileLayer'), {
      attribution: this.mapPicker('attribution'),
      minZoom: 1,
      maxZoom: this.mapPicker('maxZoom'),
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiZmxvd3JhbiIsImEiOiJja2gweGV1bGkwMnFrMnhxeTRvbGVsdmJ2In0.PcExAwc7ssv0VbrNB_sbtg',
      bounds: [
        [-75, -180],
        [81, 180],
      ],
      apikey: 'choisirgeoportail',
      format: 'image/jpeg',
      style: 'normal',
    }).addTo(this.map);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  mapPicker(param) {
    const { value } = this.state;
    switch (value) {
      case 'light map':
        return lightMap[param];
      case 'dark map':
        return darkMap[param];
      case 'Satellite map':
        return satMap[param];
      default:
        return lightMap[param];
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="mapContainer">
        <div id="wildmap">
          <select
            name="mapSelector"
            className="mapSelector"
            value={value}
            onChange={this.handleChange}
          >
            <option value="light map">Light map</option>
            <option value="dark map">Dark map</option>
            <option value="Satellite map">Satellite view</option>
          </select>
        </div>
      </div>
    );
  }
}
