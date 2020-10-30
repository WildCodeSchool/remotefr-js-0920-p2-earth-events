import React from 'react';
import EventPreview from '../EventPreview';
import './style.css';

const CurrentEvents = class CurrentEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      latest: [],
    };
    // TODO: replace with EONET API lib
    fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/events?status=open&limit=15')
      .then((result) => result.json())
      .then((data) => {
        this.setState({
          latest: data.events,
          loading: false,
        });
      });
  }

  render() {
    const { latest, loading } = this.state;
    return (
      <section id="CurrentEvents">
        <h2>Événements naturels en cours</h2>
        {loading ? (
          <p className="loading">Récupération des données en cours…</p>
        ) : (
          ''
        )}
        {!loading && !latest.length ? (
          <p clasName="empty">Aucun événement</p>
        ) : (
          ''
        )}
        {!loading && latest.length ? (
          <ol>
            {latest.map((event) => (
              <li>
                <EventPreview event={event} />
              </li>
            ))}
          </ol>
        ) : (
          ''
        )}
      </section>
    );
  }
};

export default CurrentEvents;
