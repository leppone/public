import React, { useState } from 'react'

const Anekdootit = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)

  console.log(selected)

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <button onClick={() => setSelected(Math.floor((Math.random() * anecdotes.length )))}>next anecdote</button>
    </div>
  )
}

export default Anekdootit;