const reducer = (state = null, action) => {
  switch (action.type) {

  case 'CREATE_NOTIFICATION':
    return action.data

  case 'REMOVE_NOTIFICATION':
    return null

  default:
    return state
  }
}

let currentTimeoutId = null
export const setNotification = (msg, error = false, time = 5) => {
  return async dispatch => {
    if (currentTimeoutId) clearTimeout(currentTimeoutId)

    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: {
        msg,
        error
      }
    })

    currentTimeoutId = setTimeout(() => {
      currentTimeoutId = null
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, (time * 1000))
  }
}

export default reducer