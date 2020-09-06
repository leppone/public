import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'

const App = () => {
  // State handlers
  const [ countries, setCountries] = useState([])
  const [ filtered, setFiltered ] = useState([])

  // Event handlers
  const handleFilter = (event) => {
    if(countries) {
      setFiltered( countries.filter(country => country.name.toLowerCase().indexOf(event.target.value) > -1 ) )
    }
  }

  // "Main"
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>find countries <input onChange={handleFilter} /></div>
      <Country filteredList={filtered}>  </Country>
    </div>
  )

}

export default App