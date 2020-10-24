import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

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
              username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
              password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          id='loginButton'
          type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm