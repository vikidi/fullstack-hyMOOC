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

export const setNotification = (msg, time) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: msg
    })
    
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, (time * 1000))
  }
}

export default reducer