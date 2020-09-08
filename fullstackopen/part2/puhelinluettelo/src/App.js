import React, { useState, useEffect } from 'react'
import Ui from './components/Ui'
import nameService from './services/names'

const App = () => {
  // State handlers
  const [ persons, setPersons] = useState([]) 

  // Event handlers
  const addName = (event, newName, newNumber) => {
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
        console.log("service response: ", response)
        setPersons(persons.concat(response.data))
      })
  }

  const removeName = (id, name) => {
    console.log(`call remove for: /persons/${id} (${name})` )
    if( window.confirm(`Delete ${name}?`) ) {
      nameService
        .remove(id)
        .then(response => {
          console.log("service response: ", response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
    <Ui persons={persons} addName={addName} removeName={removeName}></Ui>
  )

}

export default App