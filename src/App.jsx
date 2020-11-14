import React, { useEffect, useState } from 'react';
// import './App.css';
import SideNav from './components/SideNav/SideNav';
import Map from './components/Map/Map';

function App() {
  const [lastVisit, setLastVisit] = useState('');
  useEffect(() => {
    if (window.localStorage.getItem('lastVisit')) {
      setLastVisit(window.localStorage.getItem('lastVisit').slice(0, 10));
    } else {
      setLastVisit('');
    }
    window.localStorage.setItem('lastVisit', new Date().toISOString());
  }, []);
  return (
    <div>
      <SideNav lastVisit={lastVisit} />
      <Map />
    </div>
  );
}

export default App;
