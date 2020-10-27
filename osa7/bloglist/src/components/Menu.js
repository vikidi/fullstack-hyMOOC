import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={'App-header'}>
      <Link className='App-link' to='/blogs'>Blogs</Link>
      <Link className='App-link' to='/users'>Users</Link>
      {user && <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div>}
    </div>
  )
}

export default Menu