import React from 'react'

const Person = ({person, removeName}) => {
  
  return (
    <div> 
      <p key={person.name}>
        {person.name} {person.number} 
        <button onClick={removeName}>delete</button>
      </p>
    </div>
  )
}

export default Person;