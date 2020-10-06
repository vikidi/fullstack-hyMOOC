const initialState = null

export const DEFAULT_NOTIF_TIME = 5000

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_NOTIFICATION':
      return action.data

    case 'REMOVE_NOTIFICATION':
      return null

    default:
      return state
  }
}

export const createNotification = msg => {
  return ({
    type: 'CREATE_NOTIFICATION',
    data: msg
  })
}

export const removeNotification = () => {
  return ({
    type: 'REMOVE_NOTIFICATION'
  })
}

export default reducer