import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Anekdootit = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, vote] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))
  const [highest, setHighest] = useState(0)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if( copy[selected] > copy[highest] )
      setHighest(selected)
    vote(copy)
    console.log(votes, "highest", highest)
  }

  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={ () => 
        setSelected(Math.floor((Math.random() * anecdotes.length )))} 
        text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[highest]} <br/>
      has {votes[highest]} votes <br/>
    </div>
  )
}

export default Anekdootit;