import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import nameService from './services/names'

const App = () => {
  // State handlers
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  // Internal functions
  function addName(event) {
    // Prevent default behavior of submit (page reload)
    event.preventDefault()

    var person = persons.find(p => console.log("existing item : ", p.name) || p.name.toLowerCase() === newName.toLowerCase())
    if( person !== undefined ) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    const nameObject = { name: newName, number: newNumber }    
    nameService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
  useEffect(() => {
    nameService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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