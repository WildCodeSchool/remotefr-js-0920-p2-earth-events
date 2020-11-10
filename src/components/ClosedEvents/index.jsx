import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';

class ClosedEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentView: [],
      error: false,
    };
  }

  componentDidMount() {
    const { updateMapEvents } = this.props;
    eonet({
      field: 'events',
      params: {
        status: 'closed',
        limit: 50,
      },
    })
      .then((data) => {
        if (data) {
          this.setState({
            currentView: data.events,
            loading: false,
          });
          updateMapEvents(data.events);
        }
      })
      .catch((error) => this.setState({ loading: false, error }));
  }

  render() {
    const { currentView, loading, error } = this.state;
    return (
      <section className="ClosedEvents">
        <h2>Closed Events</h2>
        {error && <p className="error">Erreur: {error.message}</p>}
        {!error && loading && <p className="loading">Loading…</p>}
        {!error && !loading && !currentView.length && (
          <p className="empty">No Event</p>
        )}
        {!error && !loading && Boolean(currentView.length) && (
          <ol>
            {currentView.map((event) => (
              <li key={event.id}>
                <EventPreview event={event} />
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }
}

ClosedEvents.propTypes = {
  updateMapEvents: PropTypes.func.isRequired,
};

export default connect(null, reduxActions)(ClosedEvents);
