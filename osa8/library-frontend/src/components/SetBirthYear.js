import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../services/queries'

const SetBirthYear = () => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ 
      { query: ALL_AUTHORS }
    ],
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('error')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({  variables: { name: author, setBornTo: Number(year) } })

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>Update Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Birth Year
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear