import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* FUNCTIONS */

function getRandom() {
  return Math.floor(Math.random() * anecdotes.length)
}

/* COMPONENTS */

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(getRandom())
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  function vote() {
    let copy = [...points]
    ++copy[selected]
    setPoints(copy)
  }

  return (
    <div>
      <div>
        {props.anecdotes[selected]}
        <p>Has {points[selected]} points.</p>
      </div>
      
      <Button handleClick={() => vote()} text="Vote" />
      <Button handleClick={() => setSelected(getRandom())} text="Next anecdote" />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)