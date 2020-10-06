import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote, initAnecdotes } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification, DEFAULT_NOTIF_TIME } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter === '' ? 
      state.anecdotes :
      state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  const vote = (id) => {
    dispatch(voteAnecdote(id))

    dispatch(createNotification(`Anecdote '${anecdotes.filter(a => a.id === id)[0].content}' voted`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, DEFAULT_NOTIF_TIME)
  }

  const sortAnecdotes = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return anecdotes
  }

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList