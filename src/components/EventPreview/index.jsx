import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reduxActions from '../../redux/actions';
import normalizeTitle from '../../lib/normalizeTitle';
import './style.css';

// import picto_tornado from './images/tornado.png';

class EventPreview extends React.Component {
  constructor(props) {
    super(props);
    this.event = { ...props.event, ...normalizeTitle(props.event.title) };
  }

  focus = () => {
    const { updateMapBoundsFromEvents } = this.props;
    updateMapBoundsFromEvents([this.event]);
  };

  render() {
    const { categories, title, closed, id } = this.event;

    let categoriesNames = '';
    if (categories) {
      categoriesNames = categories.map((cat) => cat.title).join(',');
    }
    let picto = null;
    switch (categoriesNames) {
      case 'Severe Storms':
        picto = 'tornado.png';
        break;
      case 'Wildfires':
        picto = 'Wildfires.png';
        break;
      case 'Earthquakes':
        picto = 'Earthquakes.png';
        break;
      case 'Floods':
        picto = 'Floods.png';
        break;

      case 'Landslides':
        picto = 'Landslides.png';
        break;
      case 'Sea and Lake Ice':
        picto = 'seaLakeIce.png';
        break;

      case 'Snow':
        picto = 'Snow.png';
        break;

      case 'Temperature Extremes':
        picto = 'tempExtremes.png';
        break;

      case 'Volcanoes':
        picto = 'volcanoes.png';
        break;
      default:
        break;
    }
    /* eslint-disable */

    return (
      <article
        className={closed ? 'EventPreview closed' : 'EventPreview active'}
        id={id}
      >
        <div
          className="resulstBlock buzz-out-on-hover"
          onClick={this.focus}
          role="button"
        >
          <div className="ResultPicto">
            {picto && <img src={`images/${picto}`} alt="Picto Disaster" />}
          </div>
          <div className="ResultContent">
            <div className="resultType">{categoriesNames}</div>
            <div className="resultTitle">{title}</div>
          </div>
          <div className="ResultShowInMap">
            <div className="resultChevron">
              <img src="images/chevron-right-white.png" alt="" />
            </div>
          </div>
        </div>
      </article>
    );
  }
  /* eslint-enable */
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
  updateMapBoundsFromEvents: PropTypes.func.isRequired,
};

export default connect(null, reduxActions)(EventPreview);
