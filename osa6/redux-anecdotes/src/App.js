import React from 'react'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnacdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnacdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App