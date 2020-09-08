import React, { useState, useEffect } from 'react'
import Ui from './components/Ui'
import nameService from './services/names'

const App = () => {
  // State handlers
  const [ persons, setPersons] = useState([]) 

  // Event handlers
  const addPerson = (event, newName, newNumber) => {
    // Prevent default behavior of submit (page reload)
    event.preventDefault()

    var person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if( person !== undefined ) {
      if(window.confirm(`Update ${newName}?`)) {
        console.log("lets update " + newName)
        updatePerson(person.id, newName, newNumber)
      }
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

  const updatePerson = (id, name, newNumber) => {    
    const nameObject = { name: name, number: newNumber }

    nameService
      .update(id, nameObject)
      .then(response => {
        console.log(response)
        setPersons(persons.map(p => p.id !== id ? p : response))
      })
  }

  const removePerson = (id, name) => {
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
    <Ui persons={persons} addName={addPerson} removeName={removePerson}></Ui>
  )

}

export default App