import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

const options = {
  method: 'GET',
  url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/events',
  params: { status: 'open' },
  headers: { 'Content-Type': 'application/json' },
};

class EventsFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
    };
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios
      .request(options)
      .then((response) => response.data.events)
      .then((events) => {
        this.setState({
          eventsList: events,
        });
      });
  }

  render() {
    const { eventsList } = this.state;
    return (
      <div>
        <button type="button" onClick={this.getEvents}>
          Get events
        </button>
        <p>{eventsList.title}</p>
        <p>{eventsList.geometry[0].coordinates}</p>
      </div>
    );
  }
}

// EventsFinder.propTypes = {
//   eventsList: PropTypes.shape.isRequired,
//   title: PropTypes.string.isRequired,
//   geometry: PropTypes.string.isRequired,
//   coordinates: PropTypes.string.isRequired,
// };

export default EventsFinder;
