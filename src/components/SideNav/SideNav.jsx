import React from 'react';
import './css/SideNav.css';
import './css/YellowPanel.css';
import PropTypes from 'prop-types'; // ES6
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';

// ***************************************************
// FAKE Page and Data
// ***************************************************

const menuList = [
  // Fake menu
  {
    name: 'Option N° 1',
    route: '/opt1',
  },
  {
    name: 'Option N° 2',
    route: '/opt2',
  },
  {
    name: 'Option N° 3',
    route: '/opt3',
  },
  {
    name: 'Option N° 4',
    route: '/opt4',
  },
];

const fakePage = () => {
  return <h3>Fake Page</h3>;
};
const anotherFake = () => {
  return <h3>Another Fake Page</h3>;
};

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClose: window.location.pathname === '/',
    };
  }

  collapsedYellowPanel = (event) => {
    const { isClose } = this.state;
    const { history } = this.props;
    // Si les chemin son identique alors on referme le panel et on redirect vers "/"
    if (event.target.pathname === window.location.pathname) {
      event.preventDefault();
      this.setState(() => ({
        isClose: true,
      }));
      history.push('/');
      return;
    }

    // Si le panel n'est pas fermer, alros on le ferme puis on le re-ouvre
    if (!isClose) {
      this.setState(() => ({
        isClose: true,
      }));

      setTimeout(() => {
        this.setState(() => ({
          isClose: false,
        }));
      }, 390);
    } else {
      this.setState(() => ({
        isClose: false,
      }));
    }
  };

  // On ferme le Panel
  closeYellowPanel = () => {
    this.setState(() => ({
      isClose: true,
    }));
  };

  render = () => {
    const { isClose } = this.state;
    return (
      <div>
        <div className="sidenav">
          <div>
            <NavLink to="/">
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
              onClick={this.closeYellowPanel}
              className="close-button"
            >
              Close Panel
            </NavLink>
          </div>
          <div className="yellow-panel-container">
            <Switch>
              <Route exact path="/" />
              <Route exact path="/opt1" component={fakePage} />
              <Route exact path="/opt2" component={anotherFake} />
              <Route exact path="/opt3" component={fakePage} />
              <Route exact path="/opt4" component={anotherFake} />
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
};

export default withRouter(SideNav);
