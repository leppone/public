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
      .then(flares => {
        // Once received, render page
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
      });
  },)


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

    // Return array of all items having maxValue
    return Object.keys(groupList).filter((item) => {
      return groupList[item] >= maxValue;
    });
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
