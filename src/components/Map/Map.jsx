import React from 'react';
import L from 'leaflet';
import './CSS/map.css';

export default class Map extends React.Component {
  componentDidMount() {
    this.map = L.map('wildmap').setView([45.184094, 0.716364], 6);

    L.tileLayer(
      'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
      {
        attribution:
          'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        // From bounds to titlematrixset, these params are specific to this map (except for the maxZoom).
        bounds: [
          [-85.0511287776, -179.999999975],
          [85.0511287776, 179.999999975],
        ],
        minZoom: 1,
        maxZoom: 8,
        format: 'jpg',
        time: '',
        tilematrixset: 'GoogleMapsCompatible_Level',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoiZmxvd3JhbiIsImEiOiJja2gweGV1bGkwMnFrMnhxeTRvbGVsdmJ2In0.PcExAwc7ssv0VbrNB_sbtg',
      },
    ).addTo(this.map);
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="wildmap" />
      </div>
    );
  }
}
