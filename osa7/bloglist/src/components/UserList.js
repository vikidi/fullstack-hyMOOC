import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.username}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList