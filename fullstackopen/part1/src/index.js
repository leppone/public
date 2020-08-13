import React from 'react'
import ReactDOM from 'react-dom'
import Unicafe from './components/d_unicafe'
import Kurssitiedot from './components/a_kurssitiedot'
import Anekdootit from './components/d_anekdootit'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = () => {

  return (
    <div>
      <h1>Select app:</h1>
      <Button handleClick={() => ReactDOM.render(<Kurssitiedot />, document.getElementById('root'))} text="a_kurssitiedot" />
      <Button handleClick={() => ReactDOM.render(<Unicafe />, document.getElementById('root'))} text="d_unicafe" />
      <Button handleClick={() => ReactDOM.render(<Anekdootit anecdotes={anecdotes} />, document.getElementById('root'))} text="d_anekdootit" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))