import React from 'react';
import L from 'leaflet';
import './CSS/map.css';

export default function Map() {
  const map = L.map('wildmap').setView([45.184094, 0.716364], 6);

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiZmxvd3JhbiIsImEiOiJja2gweGV1bGkwMnFrMnhxeTRvbGVsdmJ2In0.PcExAwc7ssv0VbrNB_sbtg',
    },
  ).addTo(map);
  return <div id="wildmap" />;
}
