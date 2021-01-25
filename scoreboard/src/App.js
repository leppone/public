import React from 'react'
import Scoreboard from "./components/Scoreboard"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {  
// TODO: Add some loading spinner on this level!
  return (
    <div className="App">
      <header className="App-header">
        <Scoreboard />
      </header>
    </div>
  );
}

export default App;
