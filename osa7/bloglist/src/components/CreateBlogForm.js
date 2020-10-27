import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, TextField } from '@material-ui/core'

import { setNotification } from '../reducers/notificationReducer'

const CreateBlogForm = ({ CreateBlog, toggleVisibility }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    CreateBlog({ title, author, url })

    dispatch(setNotification(`New blog '${title}' created!`))

    setTitle('')
    setAuthor('')
    setUrl('')

    if (toggleVisibility) {
      toggleVisibility()
    }
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreate}>
        <div>
          <TextField
            label='Title'
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Author'
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Url'
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button style={{ margin: '5px' }} variant='contained' color='primary' id='createButton' type='submit'>Create</Button>
      </form>
    </div>
  )
}

export default CreateBlogForm
