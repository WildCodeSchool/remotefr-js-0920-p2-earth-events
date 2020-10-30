import React from 'react';
import PropTypes from 'prop-types';
import normalizeTitle from '../../lib/normalizeTitle';
import './style.css';

const EventPreview = class EventPreview extends React.Component {
  constructor(props) {
    super(props);
    this.event = { ...props.event, ...normalizeTitle(props.event.title) };
  }

  render() {
    const { categories, geometry, title, county, state, country } = this.event;
    return (
      <article className="EventPreview">
        <h2>{title}</h2>
        {country || state || country ? (
          <p className="location">
            {county ? <span className="county">{county}</span> : ''}
            {state ? <span className="state">{state}</span> : ''}
            {country ? <span className="country">{country}</span> : ''}
          </p>
        ) : (
          ''
        )}
        {categories.length ? (
          <ul className="categories">
            {categories.map((cat) => {
              return <li>{cat.title}</li>;
            })}
          </ul>
        ) : (
          ''
        )}
        {geometry.length ? <time>{geometry[0].date}</time> : ''}
      </article>
    );
  }
};

EventPreview.propTypes = {
  event: PropTypes.shape.isRequired,
};

export default EventPreview;
