import React, { useState } from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const loginUser = await loginService.login({ username, password })

            window.localStorage.setItem('loggedUser', JSON.stringify(loginUser))
            blogService.setToken(loginUser.token)
            setUser(loginUser)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
}

export default LoginForm