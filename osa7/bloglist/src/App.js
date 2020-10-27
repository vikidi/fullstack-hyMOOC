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

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { logout, initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const setNotif = (msg, error = false) => {
    dispatch(setNotification(msg, error))
  }

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div>
      {notification && <Notification message={notification.msg} success={!notification.error} />}

      <h2>Blogs</h2>

      {user ? <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div> : <LoginForm setNotification={setNotif} />}

      <Switch>
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