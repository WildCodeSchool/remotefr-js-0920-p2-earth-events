import React from 'react';
import ReactCalendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import './style.css';
import eonet from '../../lib/eonet';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: {}, events: {} };
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
    if (selectDate === null) {
      return {};
    }

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
      });

    this.setState({ events: result });
    return {};
  };

  /**
   * @name render
   * @description render dom
   */

  render = () => {
    const { date, events } = this.state;
    console.log(date);
    console.log(events);
    return (
      <div>
        <h2>Calendar</h2>
        <ReactCalendar onChange={this.onChange} value={new Date()} />
      </div>
    );
  };
}

export default withRouter(Calendar);
