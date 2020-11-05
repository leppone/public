import React, {useState, useEffect} from 'react'
import './App.css';

const App = () => {

  // ---- State hooks ----
  const [mostFlaresRegion, setTopRegion] = useState("-");
  const [mostCommonType, setTopFlare] = useState("-");


  // ---- Effect hooks ----
  useEffect(() => {
    // Fetch flare data from "server" - redirect-proxy defined in package.json
    fetch('/api/solarflares')
      .then(response => response.json())
      .then(flarelist => {
        // Once received, call event handler for page rendering
        updateStates(flarelist);
      });
  }, [])


  // ---- Helper functions ----
  const groupByCounter = (objectArray, property) => {
    // Group & count list by given property
    return objectArray.reduce( (count, obj) => {
      let key = obj[property];
      count[key] = (count[key] || 0) + 1;
      return count;
    }, {});
  }
    
  const topValuesArray = (groupList) => {
    // Biggest value(s) in list
    let maxValue = Math.max(...Object.values(groupList));
    
    // Create array of all items having maxValue
    let array = Object.keys(groupList).reduce((bigOnes, item) => {
      if(item !== "null" && groupList[item] >= maxValue) {
        bigOnes.push(item);
      }
      return bigOnes;
    }, []);

    return array;
  }


  // ---- Event handlers ----
  const updateStates = (flares) => {

    // If flares empty, server call not finished
    if(flares !== undefined && flares.length !== 0)
    {
      let regionsGrouped = groupByCounter(flares, 'activeRegionNum');
      let flareTypesGrouped = groupByCounter(flares, 'classType');

      let topRegionsStr = topValuesArray(regionsGrouped).join();
      let topFlareTypesStr = topValuesArray(flareTypesGrouped).join();

      setTopRegion(topRegionsStr);
      setTopFlare(topFlareTypesStr);
    }
  }

  // ---- Render part ----

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
