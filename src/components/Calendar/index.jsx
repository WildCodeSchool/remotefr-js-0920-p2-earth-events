import React from 'react';
import PropTypes from 'prop-types';
import ReactCalendar from 'react-calendar';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import './style.css';
import eonet from '../../lib/eonet';
import EventPreview from '../EventPreview';
import Loader from '../Loader';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: {}, events: {}, loading: false };
  }

  componentDidMount() {
    const today = new Date();
    this.setState({ date: today });
    this.getEvents(today.toISOString().split('T').shift());
  }
  /**
   * @name onChange
   * @param newDate object date
   */

  onChange = (newDate) => {
    this.setState({ date: newDate });
    this.getEvents(newDate.toISOString().split('T').shift());
  };

  /**
   * @name getEvents
   * @description Get events by date
   * @param selectDate is yyyy-mm-dd
   */

  getEvents = async (selectDate = null) => {
    const { updateMapEvents, updateMapBoundsFromEvents } = this.props;
    if (selectDate === null) {
      return {};
    }
    this.setState({
      loading: true,
      error: false,
    });
    const result = await eonet({
      field: 'events',
      params: {
        start: selectDate,
        end: selectDate,
      },
    })
      // .catch((error) => console.log(error))
      .then((data) => {
        if (data) {
          return data.events;
        }
        return {};
      })
      .catch((error) => this.setState({ loading: false, error }));
    updateMapEvents(result);
    updateMapBoundsFromEvents(result);
    this.setState({ events: result, loading: false });
    return {};
  };

  /**
   * @name render
   * @description render dom
   */

  render = () => {
    const { date, events, loading, error } = this.state;
    return (
      <div>
        <h2>Calendar</h2>
        <div id="calendar">
          <ReactCalendar onChange={this.onChange} value={new Date()} />
        </div>

        {error && <p className="error">{error.message}</p>}
        {!error && date && loading && <Loader />}
        {!error && date && !loading && !events.length && (
          <p className="empty">No Event</p>
        )}
        {!error && date && !loading && Boolean(events.length) && (
          <div>
            <h2>Results</h2>
            {events.map((event) => (
              <div key={event.id}>
                <EventPreview event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
}

Calendar.propTypes = {
  updateMapEvents: PropTypes.func.isRequired,
  updateMapBoundsFromEvents: PropTypes.func.isRequired,
};
/* eslint-disable */
export default connect(null, reduxActions)(Calendar);
/* eslint-enable */
