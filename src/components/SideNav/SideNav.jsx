import React from 'react';
import './css/SideNav.css';
import './css/YellowPanel.css';
import { NavLink, Switch, Route } from 'react-router-dom';

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

const WelcomeDude = () => {
  return <h3>Welcome</h3>;
};
const fakePage = () => {
  return <h3>Fake Page</h3>;
};
const anotherFake = () => {
  return <h3>Another Fake Page</h3>;
};

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    if (window.location.pathname === '/') {
      this.state = { isClose: true };
    } else {
      this.state = { isClose: false };
    }
  }

  collapsedYellowPanel = (event) => {
    const { isClose } = this.state;
    if (event.target.pathname === window.location.pathname) {
      this.setState(() => ({
        isClose: true,
      }));
      return;
    }
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
          <div className="yellow-panel-container">
            <NavLink to="/" onClick={this.closeYellowPanel}>
              Fermeture
            </NavLink>
            <Switch>
              <Route exact path="/" component={WelcomeDude} />
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
