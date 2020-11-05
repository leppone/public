import React, {useState, useEffect} from 'react'
import './App.css';

const App = () => {

  // ---- State hooks 
  const [mostFlaresRegion, setTopRegion] = useState("-");
  const [mostCommonType, setTopFlare] = useState("-");


  // ---- Effect hooks
  useEffect(() => {
    // Fetch flare data from "server" - redirect through proxy defined in package.json
    fetch('/api/solarflares')
      .then(response => response.json())
      .then(flarelist => {
        // Once received, call event handler for page rendering
        updateStates(flarelist);
      });
  }, [])


  // ---- Event handlers
  const updateStates = (flares) => {

    // If flares empty, server call not finished
    if(flares !== undefined && flares.length !== 0)
    {
      let listed = flares
        .reduce( (count, flare) => {
          count[flare.activeRegionNum] = (count[flare.activeRegionNum] || 0) + 1
          return count;
        }, {});

      let topFlare = Object.keys(listed).reduce((a, b) => listed[a] > listed[b] ? a : b);

      setTopRegion(topFlare);

      // ----------- Awful, unify these -------------

      let classtypes = flares
        .reduce( (count, flare) => {
          count[flare.classType] = ( count[flare.classType] || 0) + 1
          return count;
        }, {});

      let toppen = Object.keys(classtypes).reduce((a, b) => classtypes[a].count > classtypes[b].count ? a : b);
      
      setTopFlare(toppen);
    }
  }

  // ---- Render part

  return (
    <div className="App">
      <header className="App-header">
          <h1 htmlFor="name">Solar flare winners 2016: </h1>
          <p> Regions with the most solar flares: {mostFlaresRegion}</p>
          <p> The most common class type of solar flare: {mostCommonType}</p>
      </header>
    </div>
  );
}

export default App;
