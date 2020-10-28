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
    this.state = { collapsed: true };
    this.collapsedYellowPanel = this.collapsedYellowPanel.bind(this);
    this.closeYellowPanel = this.closeYellowPanel.bind(this);
  }

  // Toggle Panel
  collapsedYellowPanel = () => {
    const { collapsed } = this.state;
    if (!collapsed) {
      this.setState({
        collapsed: true,
      });

      setTimeout(() => {
        this.setState({
          collapsed: false,
        });
      }, 390);
    } else {
      this.setState({
        collapsed: false,
      });
    }
  };

  // Close Yellow Panel
  closeYellowPanel = () => {
    this.setState({
      collapsed: false,
    });
  };

  render = () => {
    const { collapsed } = this.state;
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
        <div id="yellow-panel" className={collapsed ? 'collapsed' : ''}>
          <div className="yellow-panel-container">
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
