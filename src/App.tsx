import React from 'react';
import './App.css';
import { Mastermind } from './components/Mastermind';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Mastermind />
      </header>
    </div>
  );
}

export default App;
