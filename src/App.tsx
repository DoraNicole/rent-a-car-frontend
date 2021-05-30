import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import CarList from './components/CarList';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <HomePage/>
      <br/>
      <CarList/>
    </div>
  );
}

export default App;
