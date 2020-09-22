import React, { useState, useEffect } from 'react'

import './App.css'

import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const setError = msg => {
    setErrorMessage(msg)
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
}

const setSuccess = msg => {
    setSuccessMessage(msg)
    setTimeout(() => {
        setSuccessMessage(null)
    }, 5000)
}

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (user === null) {
    return ( 
      <div>
        <Notification message={errorMessage} success={false} />
        <Notification message={successMessage} success={true} />

        <LoginForm setUser={setUser} setErrorMessage={setError} /> 
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} success={false} />
      <Notification message={successMessage} success={true} />

      <h2>blogs</h2>

      {user.name} is logged in <button onClick={handleLogout}>logout</button>

      <br></br>

      <CreateBlogForm setBlogs={setBlogs} setErrorMessage={setError} setSuccessMessage={setSuccess} />

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App