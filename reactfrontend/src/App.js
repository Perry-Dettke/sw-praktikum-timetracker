import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Buchung from './components/pages/BuchungSeite';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <p>
         <Buchung/>
        </p>
      </header>
    </div>
  );
}

export default App;
