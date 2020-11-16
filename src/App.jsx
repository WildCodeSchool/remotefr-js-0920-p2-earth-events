import React from 'react';
// import './App.css';
import SideNav from './components/SideNav/SideNav';
import Map from './components/Map/Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    let lastVisit = '';
    if (window.localStorage.getItem('lastVisit'))
      lastVisit = window.localStorage.getItem('lastVisit').slice(0, 10);
    this.state = { lastVisit };

    window.localStorage.setItem('lastVisit', new Date().toISOString());
  }

  render() {
    const { lastVisit } = this.state;
    return (
      <div>
        <SideNav lastVisit={lastVisit} />
        <Map />
      </div>
    );
  }
}

export default App;
