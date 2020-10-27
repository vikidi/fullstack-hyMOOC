import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import {
  Container,
  Paper
} from '@material-ui/core'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  const setNotif = (msg, error = false) => {
    dispatch(setNotification(msg, error))
  }

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  return (
    <Container maxWidth={false}>

      <Menu />

      {notification && <Notification message={notification.msg} success={!notification.error} />}

      <Container>

        <h2>Blogs App</h2>

        {!user &&
          <Paper className='paper' elevation={3}>
            <LoginForm setNotification={setNotif} />
          </Paper>
        }

        <Paper className='paper' elevation={3}>
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
            <Route path='/blogs'>
              <BlogList />
            </Route>
            <Route path='/'>
              <BlogList />
            </Route>
          </Switch>
        </Paper>

      </Container>
    </Container>
  )
}

export default App