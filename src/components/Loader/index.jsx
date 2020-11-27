import React from 'react';
import './css/style.css';

function Loader() {
  return (
    <div className="center-loader">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
