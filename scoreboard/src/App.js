import React, {useState} from 'react';
import Scoreboard from './components/Scoreboard';
import InfoBox from './components/InfoBox';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {  
  // --- States ---
  const [ infoMessage, setInfoMessage ] = useState(null);

  // --- Internal functions ---
  const handleInfoBox = (message) => {
    setInfoMessage ( message );
  }

  // TODO: Add some loading spinner on this level!
  return (
    <div className="App">
      <header className="App-header">
        <InfoBox infoMessage={infoMessage} />
        <Scoreboard handleInfoBox={handleInfoBox} />
      </header>
    </div>
  );
}

export default App;
