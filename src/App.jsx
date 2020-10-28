import React from 'react';
import axios from 'axios';
import './App.css';
import EventsFinder from './components/EventsFinder';

const options = {
  method: 'GET',
  url: 'https://eonet.sci.gsfc.nasa.gov/api/v3/events',
  params: { status: 'open' },
  headers: { 'Content-Type': 'application/json' },
};

class App extends React.Component {
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
      <div className="App">
        <button type="button" onClick={this.getEvents}>
          Get events
        </button>
        {eventsList.map((event) => (
          <EventsFinder eventsImport={event} />
        ))}
      </div>
    );
  }
}

export default App;
