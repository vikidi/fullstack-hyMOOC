import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route, Link,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { logout, initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const setNotif = (msg, error = false) => {
    dispatch(setNotification(msg, error))
  }

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  return (
    <div>
      {notification && <Notification message={notification.msg} success={!notification.error} />}

      <h2>Blogs</h2>

      {user ? <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div> : <LoginForm setNotification={setNotif} />}

      <Switch>
        <Route path='/blogs/:id'>
          <Blog id={blogMatch ? blogMatch.params.id : null} />
        </Route>
        <Route path='/users/:id'>
          <User id={userMatch ? userMatch.params.id : null} />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>

    </div>
  )
}

export default App