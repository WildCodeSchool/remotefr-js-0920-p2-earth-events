import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import normalizeTitle from '../../lib/normalizeTitle';
import './style.css';

const datation = (date, className) => {
  const dt = new Date(date);
  return (
    <time className={className} dateTime={date}>
      {dt.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </time>
  );
};

class EventPreview extends React.Component {
  constructor(props) {
    super(props);
    this.event = { ...props.event, ...normalizeTitle(props.event.title) };
  }

  render() {
    const {
      categories,
      geometry,
      title,
      county,
      state,
      country,
      sources,
    } = this.event;
    return (
      <article className="EventPreview">
        <h2>{title}</h2>
        {categories.length ? (
          <ul className="categories">
            {categories.map((cat) => {
              return <li key={cat.id}>{cat.title}</li>;
            })}
          </ul>
        ) : (
          ''
        )}
        {county || state || country ? (
          <p className="location">
            {county ? <span className="county">{county}</span> : ''}
            {state ? <span className="state">{state}</span> : ''}
            {country ? <span className="country">{country}</span> : ''}
          </p>
        ) : (
          ''
        )}
        {geometry.length ? (
          <details className="features">
            <summary>Positions</summary>
            <ol>
              {geometry.map((gem) => (
                <li key={gem.date} data-type={gem.type}>
                  {datation(gem.date)}
                  <span className="lat">{gem.coordinates[1]}°</span>
                  <span className="long">{gem.coordinates[0]}°</span>
                  <span className="magnitude">
                    {gem.magnitudeValue
                      ? gem.magnitudeValue + gem.magnitudeUnit
                      : ' '}
                  </span>
                </li>
              ))}
            </ol>
          </details>
        ) : (
          ''
        )}
        <footer>
          <p>Source{sources.length > 1 ? 's' : ''}:</p>
          <ul>
            {sources.map((src) => (
              <li key={src.id}>
                <a href={src.url}>{src.id}</a>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    );
  }
}

EventPreview.propTypes = {
  event: PropTypes.shape({
    categorie: PropTypes.string,
    geometry: PropTypes.arrayOf(PropTypes.shape),
    title: PropTypes.string,
    county: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default connect(null, reduxActions)(EventPreview);
