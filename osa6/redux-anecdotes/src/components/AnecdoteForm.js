import React from 'react'
import { useDispatch } from 'react-redux'

import anecdoteService from '../services/anecdoteService'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification, DEFAULT_NOTIF_TIME } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote.content))

    dispatch(createNotification(`Anecdote '${content}' created`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, DEFAULT_NOTIF_TIME)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form> 
    </div>
  )
}

export default AnecdoteForm