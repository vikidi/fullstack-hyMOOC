import React from 'react'

import { Alert } from '@material-ui/lab'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert severity={success ? 'success' : 'error'}>{message}</Alert>
  )
}

export default Notification