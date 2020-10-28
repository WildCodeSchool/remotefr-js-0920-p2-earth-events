import React from 'react';
import PropTypes from 'prop-types';

function EventsFinder({ eventsImport }) {
  return (
    <div>
      <p>{eventsImport.title}</p>
      <p>{eventsImport.geometry[0].coordinates}</p>
    </div>
  );
}

EventsFinder.propTypes = {
  eventsImport: PropTypes.shape.isRequired,
  // title: PropTypes.string.isRequired,
  // geometry: PropTypes.string.isRequired,
  // coordinates: PropTypes.string.isRequired,
};

export default EventsFinder;
