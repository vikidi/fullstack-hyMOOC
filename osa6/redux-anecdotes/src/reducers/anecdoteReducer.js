import anecdoteService from '../services/anecdoteService'

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

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
}

export default reducer