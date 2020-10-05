import React, { useState } from 'react'

const CreateBlogForm = ({ CreateBlog, toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    CreateBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')

    if (toggleVisibility) {
      toggleVisibility()
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
              Title
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              Author
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              Url
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
