import React from 'react';
// import EventPreview from '../EventPreview';
// import eonet from '../../lib/eonet';
import './style.css';

// placeholders
const EventPreview = () => (
  <p className="placeholder">EventPreview placeholder</p>
);
const eonet = () => Promise.reject(new Error('Waiting for EONET lib'));

const ClosedEvents = class ClosedEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentView: [],
      error: false,
    };
  }

  componentDidMount() {
    eonet({
      field: 'events',
      params: {
        status: 'closed',
        days: 1,
      },
    })
      .catch((error) => this.setState({ loading: false, error }))
      .then((data) => {
        if (data) {
          this.setState({
            currentView: data.events,
            loading: false,
          });
        }
      });
  }

  render() {
    const { currentView, loading, error } = this.state;
    return (
      <section id="ClosedEvents">
        <h2>Événements terminés</h2>
        {error ? <p className="error">Erreur: {error.message}</p> : ''}
        {!error && loading ? (
          <p className="loading">Récupération des données…</p>
        ) : (
          ''
        )}
        {!error && !loading && !currentView.length ? (
          <p className="empty">Aucun événement</p>
        ) : (
          ''
        )}
        {!error && !loading && currentView.length ? (
          <ol>
            {currentView.map((event) => (
              <li key={event.id}>
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

export default ClosedEvents;
