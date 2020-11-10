import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import normalizeTitle from '../../lib/normalizeTitle';
import './style.css';

class EventPreview extends React.Component {
  constructor(props) {
    super(props);
    this.event = { ...props.event, ...normalizeTitle(props.event.title) };
    this.focus = this.focus.bind(this);
  }

  focus() {
    const { updateMapBounds } = this.props;
    updateMapBounds([this.event]);
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
          <button type="button" onClick={this.focus}>
            See on map
          </button>
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
  updateMapBounds: PropTypes.func.isRequired,
};

export default connect(null, reduxActions)(EventPreview);
