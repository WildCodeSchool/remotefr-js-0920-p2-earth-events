import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import reduxActions from '../../redux/actions';
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

class Map extends React.Component {
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
    this.layerGroup = new L.LayerGroup();
    this.layerGroup.addTo(this.map);
  }

  componentDidUpdate() {
    const { currentView } = this.props;
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
    this.layerGroup.clearLayers();
    currentView.forEach((event) => {
      const subLayerGroup = new L.LayerGroup();
      this.layerGroup.addLayer(subLayerGroup);
      if (event.geometry.length > 1) {
        const line = L.polyline([], {
          color: event.closed ? 'slategrey' : 'darkred',
          weight: event.closed ? 5 : 7,
        });
        line.bindPopup(`<p>${event.title}</p>`);
        subLayerGroup.addLayer(line);
        event.geometry.forEach((feature) => {
          if (feature.coordinates) {
            const coord = [...feature.coordinates].reverse();
            line.addLatLng(coord);
          }
        });
      } else {
        L.marker([...event.geometry[0].coordinates].reverse(), {
          icon: pulsar,
        })
          .bindPopup(`<p>${event.title}<br/>${event.geometry[0].date}</p>`)
          .addTo(subLayerGroup);
      }
    });
    this.focus();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  focus() {
    const { bounds } = this.props;
    if (bounds && bounds.length) this.map.flyToBounds(bounds, { maxZoom: 8 });
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

Map.propTypes = {
  currentView: PropTypes.arrayOf(PropTypes.shape),
  bounds: PropTypes.arrayOf(PropTypes.shape),
};
Map.defaultProps = {
  currentView: [],
  bounds: [],
};

export default connect((state = {}) => {
  return {
    currentView: state.mapEvents.currentView,
    bounds: state.mapEvents.bounds,
  };
}, reduxActions)(Map);
