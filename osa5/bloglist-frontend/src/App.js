import React, { useState, useEffect, /* useRef */ } from 'react'

import './App.css'

import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Not in use
  //const blogFormRef = useRef()

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
      <br></br>

      <Togglable buttonLabel={'Create new'} /* ref={blogFormRef} */ >

        <CreateBlogForm 
          setBlogs={setBlogs} 
          setErrorMessage={setError} 
          setSuccessMessage={setSuccess} />

      </Togglable>

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App