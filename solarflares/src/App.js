import React, {useState} from 'react'
import './App.css';

const App = () => {
  // State hooks
  const [flares, setFlares] = useState([])

  // Event handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch flare data from "server" 
    // -- COULD CALL SOME MORE SPECIFIC FUNCTION, BUSINESS LOGIC, THAT ACTUALLY CALLS THE SERVER
    fetch(`/api/solarflares`)
      .then(response => response.json())
      .then(flarelist => setFlares(flarelist));
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Find out how many flares in 2016: </label>
            <button type="submit">Submit</button>
          </form>
          
          {flares
            .map((flare) =>
            <p key={flare.id}>{flare.sourceLocation} {flare.activeRegionNum}</p>
          )}
          
      </header>
    </div>
  );
}

export default App;
