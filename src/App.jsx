import React, { useEffect, useState } from 'react';
// import './App.css';
import SideNav from './components/SideNav/SideNav';
import Map from './components/Map/Map';

function App() {
  const [lastVisit, setLastVisit] = useState('');
  const [storageCount, setStorageCount] = useState(0);
  function handleCount() {
    setTimeout(function () {
      setStorageCount(storageCount + 1);
    }, 15000);
  }
  handleCount();
  useEffect(() => {
    if (window.localStorage.getItem('lastVisit')) {
      setLastVisit(window.localStorage.getItem('lastVisit').slice(0, 10));
      console.log(lastVisit);
    }
    window.localStorage.setItem('lastVisit', new Date().toISOString());
    console.log(window.localStorage.getItem('lastVisit'));
  }, [storageCount]);
  return (
    <div>
      <SideNav lastVisit={lastVisit} />
      <Map />
    </div>
  );
}

export default App;
