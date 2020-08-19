import React, { useState } from 'react'

const App = () => {
  // State handlers
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
        .map( person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App