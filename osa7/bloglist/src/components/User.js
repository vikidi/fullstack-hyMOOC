import React, { useState, useEffect } from 'react'

import userService from '../services/users'

const UserList = ({ id }) => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    userService.getAll()
      .then(res => {
        setUser(res.find(u => u.id === id))
      })
  }, [id])

  if(!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default UserList