import React from 'react'
import ReactDOM from 'react-dom'
import Unicafe from './d_unicafe'
import Kurssitiedot from './a_kurssitiedot'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {

  return (
    <div>
      <h1>Select app:</h1>
      <Button handleClick={() => ReactDOM.render(<Kurssitiedot />, document.getElementById('root'))} text="a_kurssitiedot" />
      <Button handleClick={() => ReactDOM.render(<Unicafe />, document.getElementById('root'))} text="d_unicafe" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))