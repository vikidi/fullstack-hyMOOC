import React, { useEffect, /* useRef */ } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { logout, initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  })
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  // Not in use
  //const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(logout())
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
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        {notification && <Notification message={notification.msg} success={!notification.error} />}

        <LoginForm setNotification={setNotif} />
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