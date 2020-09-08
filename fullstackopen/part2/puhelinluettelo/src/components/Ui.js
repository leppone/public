import React, {useState} from 'react'
import Person from './Person'

const Ui = ({persons, addName, removeName}) => {
  // Statehandlers
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  // Event handlers
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

// // // // //   const clearForm = () => {
// // // // //       setNewName('')
// // // // //       setNewNumber('')
// // // // //   }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input onChange={handleFilter} /></div>

      <form onSubmit={(event) => addName(event, newName, newNumber)}>
          <div>name: <input value={newName} onChange={handleNameAdd} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberAdd} /></div>
          <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>
      
      {persons
        .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
        .map((person) =>
          <Person key={person.id} person={person} removeName={() => removeName(person.id, person.name)} />
      )}
        
    </div>
  )
}

export default Ui;