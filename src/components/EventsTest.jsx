import React from 'react';
import eventsFinder from './EventsFinder';

function EventsTest() {
  return (
    <div>
      <h1>Events you picked</h1>
      <p>{eventsFinder({ params: { status: 'open' } })}</p>
      {/* <p>{eventsList[0].title}</p>
                <p>{eventsList[0].geometry[0].coordinates}</p> */}
    </div>
  );
}
export default EventsTest;
