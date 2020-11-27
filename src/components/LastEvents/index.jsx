import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';
import Loader from '../Loader';

class LastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentView: [],
      error: false,
    };
  }

  componentDidMount() {
    const {
      lastVisit,
      updateMapEvents,
      updateMapBoundsFromEvents,
    } = this.props;
    eonet({
      field: 'events',
      params: {
        start: lastVisit,
        end: new Date().toISOString().slice(0, 10),
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
  }

  render() {
    const { currentView, loading, error } = this.state;
    const { lastVisit } = this.props;
    return (
      <section className="LastEvents">
        <h2>Events since your last visit</h2>
        {lastVisit === '' && (
          <p className="error">This is your first visit, please come again.</p>
        )}
        {error && <p className="error">Erreur: {error.message}</p>}
        {!error && loading && <Loader />}
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

LastEvents.propTypes = {
  lastVisit: PropTypes.string.isRequired,
  updateMapEvents: PropTypes.func.isRequired,
  updateMapBoundsFromEvents: PropTypes.func.isRequired,
};

export default connect(null, reduxActions)(LastEvents);
