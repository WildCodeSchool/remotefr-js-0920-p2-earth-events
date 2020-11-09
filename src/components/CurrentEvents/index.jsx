import React from 'react';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';

const CurrentEvents = class CurrentEvents extends React.Component {
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
        status: 'open',
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
      <section id="CurrentEvents">
        <h2>Current Events</h2>
        {error ? <p className="error">Erreur: {error.message}</p> : ''}
        {!error && loading ? <p className="loading">Loading…</p> : ''}
        {!error && !loading && !currentView.length ? (
          <p className="empty">No Event</p>
        ) : (
          ''
        )}
        {!error && !loading && Boolean(currentView.length) ? (
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

export default CurrentEvents;
