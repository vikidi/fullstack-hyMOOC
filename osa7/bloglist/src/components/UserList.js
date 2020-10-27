import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import userService from '../services/users'

const UserList = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(res => {
        setUsers(res)
      })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList