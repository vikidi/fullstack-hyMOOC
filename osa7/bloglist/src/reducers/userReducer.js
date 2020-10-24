import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {

  case 'LOGIN_USER':
    return action.data

  case 'LOGOUT_USER':
    return null

  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const login = user => {
  return async dispatch => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default reducer