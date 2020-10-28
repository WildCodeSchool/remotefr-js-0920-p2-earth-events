import React from 'react';

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
      <section>
        <h2>Événements naturels en cours</h2>
        {loading ? <p>Récupération des données en cours…</p> : ''}
        {!loading && !latest.length ? <p>Aucun événement</p> : ''}
        {!loading && latest.length ? (
          <ol>
            {latest.map((event) => (
              <li>{event.title}</li>
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
