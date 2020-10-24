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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  // Not in use
  //const blogFormRef = useRef()

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()

    blogs.sort((a, b) => {
      return b.likes - a.likes
    })

    setBlogs(blogs)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLike = async (blog) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.update(blog.id, newBlog)

    updateBlogs()
  }

  const CreateBlog = async (newBlog) => {
    try {
      const b = await blogService.create(newBlog)

      setNotif(`a new blog '${b.title}' by ${b.author} created`)

      updateBlogs()
    } catch (exception) {
      setNotif('wrong credentials', true)
    }
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
    updateBlogs()
  }, [])

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
        <Blog key={blog.id} blog={blog} setBlogs={updateBlogs} loggedUser={user} likeHandler={handleLike} />
      )}

    </div>
  )
}

export default App