  import React, { useState } from 'react'

const Country = (props) => {
  // StateHandlers
  const [selectedCountry, showInfoOf] = useState()

  // Event handlers
  const handleShow = (event) => {
    showInfoOf(event.target.id)
  }

  function elementConstructor(country) {
    if(selectedCountry === country.name || props.filteredList.length === 1 ) {
      console.log( "Show: ", country.name)
      return (
        <div key={"div-" + country.name}>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map( lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name} height="20%" width="20%"></img>  
        </div> 
      )
    }
    else {
      return (
        <div key={"div-" + country.name}>
          <p>{country.name}
            <button onClick={handleShow} id={country.name} key={"button-" + country.name}>show</button>
          </p>
        </div>
      )
    }
  }

  // "main"
  // let filtered = props.countries.filter(country => country.name.toLowerCase().indexOf(props.filter) > -1 )
  console.log('render', props.filteredList.length)
  
  if(props.filteredList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    return (
      <div>
        {props.filteredList.map( elementConstructor )}
      </div>
    )
  }
}

export default Country;