const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      )

    default:
      return state
  }
}

export const initAnecdotes = (anecdotes) => {
  return ({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export default reducer