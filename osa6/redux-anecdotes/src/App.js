import React from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnacdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnacdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App