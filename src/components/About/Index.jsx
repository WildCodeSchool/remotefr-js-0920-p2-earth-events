import React from 'react';
import './css/about.css';

function About() {
  return (
    <div className="aboutContainer">
      <h2>About</h2>
      <p>
        This application has been created by three{' '}
        <a href="https://www.wildcodeschool.com/fr-FR">Wilders</a> :{' '}
        <a href="https://github.com/woozyfr">Alexandre Chauvin</a>,{' '}
        <a href="https://github.com/e-floran">Floran Eiclies </a>
        and <a href="https://github.com/clovfr">Clovis Gauzy</a>.
      </p>
      <p>
        We used <a href="https://reactjs.org/">React</a>,{' '}
        <a href="https://leafletjs.com/">Leaflet</a>, the{' '}
        <a href="https://eonet.sci.gsfc.nasa.gov/">Eonet</a> API and a little
        bit of skills.
      </p>
    </div>
  );
}
export default About;
