import React, { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlogForm = ({ setBlogs, setErrorMessage, setSuccessMessage, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url })

      setSuccessMessage(`a new blog '${blog.title}' by ${blog.author} created`)

      setTitle('')
      setAuthor('')
      setUrl('')

      toggleVisibility()

      setBlogs()
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
              Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
