import React from 'react';
import './css/SideNav.css';
import './css/YellowPanel.css';
import PropTypes from 'prop-types'; // ES6
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import Contact from '../Contact';
import Calendar from '../Calendar';
import CurrentEvents from '../CurrentEvents';
import ClosedEvents from '../ClosedEvents';
import EventsByDate from '../EventsByDate';
import LastEvents from '../LastEvents';
import EventsByCategorie from '../EventsByCategorie';
import crossIcon from './images/cross-sign.png';
// ***************************************************
// FAKE Page and Data
// ***************************************************

const menuList = [
  // Fake menu
  {
    name: 'Current',
    route: '/current',
  },
  {
    name: 'History',
    route: '/history',
  },
  {
    name: 'Closed',
    route: '/closed',
  },
  {
    name: 'Calendar',
    route: '/calendar',
  },
  {
    name: 'Last events',
    route: '/last',
  },
  {
    name: 'Categories',
    route: '/categories',
  },
  {
    name: 'Contact',
    route: '/contact',
  },
];

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClose: window.location.pathname === '/',
    };
  }

  /**
   *
   * @name collapsedYellowPanel
   * @description gestion de l'ouverture et fermeture du pannel
   * @param {*} event
   * @memberof SideNav
   */
  collapsedYellowPanel = (event) => {
    const { isClose } = this.state;
    const { history } = this.props;
    // Si les chemin son identique alors on referme le panel et on redirect vers "/"
    if (event.target.pathname === window.location.pathname) {
      event.preventDefault();
      this.setPanel('close');
      history.push('/');
      return;
    }

    // Si le panel n'est pas fermer, alros on le ferme puis on le re-ouvre
    if (!isClose) {
      this.setPanel('close');
      setTimeout(() => {
        this.setPanel('open');
      }, 390);
    } else {
      this.setPanel('open');
    }
  };

  /**
   * @name setPanel
   * @description Gestion de la fermeture et ouverture du pannel
   * @memberof SideNav
   */

  setPanel = (value) => {
    switch (value) {
      case 'open':
        this.setState(() => ({
          isClose: false,
        }));
        break;
      default:
      case 'close':
        this.setState(() => ({
          isClose: true,
        }));
        break;
    }
  };

  render = () => {
    const { isClose } = this.state;
    const { lastVisit } = this.props;
    return (
      <div>
        <div className="sidenav">
          <div>
            <NavLink to="/" onClick={() => this.setPanel('close')}>
              <img src="images/logo_wild.jpg" className="logo" alt="logo" />
            </NavLink>
          </div>
          <div className="titleParameters">Parametres</div>
          <div className="menu-button">
            {menuList.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                activeClassName="selected"
                onClick={this.collapsedYellowPanel}
              >
                <div>{item.name}</div>
                <div>
                  <img src="images/chevron-right-white.png" alt="" />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div id="yellow-panel" className={!isClose ? '' : 'isOpen'}>
          <div className="yellow-panel-options">
            <NavLink
              to="/"
              onClick={() => this.setPanel('close')}
              className="close-button"
            >
              <img src={crossIcon} alt="close panel" className="crossIcon" />
            </NavLink>
          </div>
          <div className="yellow-panel-container">
            <Switch>
              <Route exact path="/" />
              <Route exact path="/current" component={CurrentEvents} />
              <Route exact path="/history" component={EventsByDate} />
              <Route exact path="/closed" component={ClosedEvents} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/categories" component={EventsByCategorie} />
              <Route
                exact
                path="/last"
                render={() => <LastEvents lastVisit={lastVisit} />}
              />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </div>
        </div>
      </div>
    );
  };
}

SideNav.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  lastVisit: PropTypes.string.isRequired,
};

export default withRouter(SideNav);
