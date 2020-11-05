  
import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../services/queries'

import SetBirthYear from './SetBirthYear'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {!result.loading && 
          result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <SetBirthYear />

    </div>
  )
}

export default Authors
