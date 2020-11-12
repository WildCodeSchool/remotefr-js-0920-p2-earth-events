import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';

class EventsByDate extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dateSelected: null,
      currentView: [],
      error: false,
    };
  }

  changeDate = (event) => {
    const { updateMapEvents, updateMapBoundsFromEvents } = this.props;
    this.setState({
      loading: true,
      error: false,
      dateSelected: event.target.value,
    });
    eonet({
      field: 'events',
      params: {
        start: event.target.value,
        end: event.target.value,
      },
    })
      .then((data) => {
        if (data) {
          this.setState({
            currentView: data.events,
            loading: false,
          });
          updateMapEvents(data.events);
          updateMapBoundsFromEvents(data.events);
        }
      })
      .catch((error) => this.setState({ loading: false, error }));
  };

  render() {
    const { dateSelected, currentView, loading, error } = this.state;
    return (
      <section className="EventsByDate">
        <h2>History</h2>
        <p className="dateSelect">
          <input type="date" onChange={this.changeDate} />
        </p>
        {error && <p className="error">{error.message}</p>}
        {!error && dateSelected && loading && (
          <p className="loading">Loading…</p>
        )}
        {!error && dateSelected && !loading && !currentView.length && (
          <p className="empty">No Event</p>
        )}
        {!error && dateSelected && !loading && Boolean(currentView.length) && (
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

EventsByDate.propTypes = {
  updateMapEvents: PropTypes.func.isRequired,
  updateMapBoundsFromEvents: PropTypes.func.isRequired,
};

export default connect(null, reduxActions)(EventsByDate);
