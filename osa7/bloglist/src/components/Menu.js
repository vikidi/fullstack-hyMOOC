import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { AppBar, Toolbar, Button } from '@material-ui/core'

import { logout } from '../reducers/userReducer'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  right: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
}))

const Menu = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color='inherit' component={Link} to='/blogs'>Blogs</Button>
          <Button color='inherit' component={Link} to='/users'>Users</Button>
          {user && <div className={classes.right}><span style={{ display: 'block' }}>{user.name} is logged in <Button color='inherit' onClick={handleLogout}>logout</Button></span></div>}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu