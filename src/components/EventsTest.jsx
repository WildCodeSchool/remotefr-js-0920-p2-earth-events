import React, { Component } from 'react';
import eventsFinder from './EventsFinder';

class EventsTest extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.getEvents}>
          Get events
        </button>
        <p>{eventsFinder({ params: { status: 'open' } })}</p>
        {/* <p>{eventsList[0].title}</p>
                <p>{eventsList[0].geometry[0].coordinates}</p> */}
      </div>
    );
  }
}
export default EventsTest;
