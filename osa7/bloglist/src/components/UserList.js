import React, { useState, useEffect } from 'react'

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList