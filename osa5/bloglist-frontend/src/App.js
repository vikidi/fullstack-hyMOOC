import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
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
    return ( <LoginForm setUser={setUser} /> )
  }

  return (
    <div>
      <h2>blogs</h2>

      {user.username} is logged in <button onClick={handleLogout}>logout</button>

      <br></br>

      <CreateBlogForm />

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App