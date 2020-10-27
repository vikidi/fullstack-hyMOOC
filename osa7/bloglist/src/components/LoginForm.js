import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, TextField } from '@material-ui/core'

import loginService from '../services/login'

import { login } from '../reducers/userReducer'

const LoginForm = ({ setNotification }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginUser = await loginService.login({ username, password })

      setUsername('')
      setPassword('')

      dispatch(login(loginUser))
    } catch (exception) {
      setNotification('wrong credentials', true)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='Username'
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Password'
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          style={{ margin: '5px' }} variant='contained' color='primary'
          id='loginButton'
          type='submit'>login</Button>
      </form>
    </div>
  )
}

export default LoginForm