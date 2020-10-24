import React, { useState, useEffect, /* useRef */ } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  })
  const notification = useSelector(state => state.notification)

  // Not in use
  //const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const CreateBlog = async (newBlog) => {
    dispatch(createBlog(newBlog, user))
  }

  const setNotif = (msg, error = false) => {
    dispatch(setNotification(msg, error))
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
    dispatch(initBlogs())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        {notification && <Notification message={notification.msg} success={!notification.error} />}

        <LoginForm setUser={setUser} setNotification={setNotif} />
      </div>
    )
  }

  return (
    <div>
      {notification && <Notification message={notification.msg} success={!notification.error} />}

      <h2>Blogs</h2>

      {user.name} is logged in <button onClick={handleLogout}>logout</button>

      <br></br>
      <br></br>

      <Togglable buttonLabel={'Create new'} /* ref={blogFormRef} */ >

        <CreateBlogForm
          CreateBlog={CreateBlog} />

      </Togglable>

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={user} likeHandler={handleLike} />
      )}

    </div>
  )
}

export default App