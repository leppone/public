import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  // State handlers
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // Internal functions
  function addName(event) {
    event.preventDefault()

    console.log("name to be added: ", newName)
    var person = persons.find(p => console.log("existing item : ", p.name) || p.name.toLowerCase() === newName.toLowerCase())
    console.log("found entry: ", person)

    if( person !== undefined ) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }


  // Event handlers
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  // "Main"
  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input onChange={handleFilter} /></div>

      <form onSubmit={addName}>
          <div>name: <input value={newName} onChange={handleNameAdd} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberAdd} /></div>
          <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>
      
      <Persons persons={persons} filter={filter}></Persons>
        
    </div>
  )

}

export default App