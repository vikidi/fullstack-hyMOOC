import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    dispatch(createAnecdote(content))
  }

  const sortAnecdotes = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return anecdotes
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App