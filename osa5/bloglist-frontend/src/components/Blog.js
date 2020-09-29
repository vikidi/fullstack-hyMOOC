import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Button = ({ onClick, text }) => {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Blog = ({ blog, setBlogs, loggedUser }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    setBlogs: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired
  }

  const [ fullView, setFullView ] = useState(false)

  const toggleView = () => {
    setFullView(!fullView)
  }

  const handleLike = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.update(blog.id, newBlog)

    setBlogs()
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)

      setBlogs()
    }
  }

  const fullBlog = () => (
    <div className='blog'>
      {blog.title} {blog.author} <Button onClick={toggleView} text={fullView ? 'hide' : 'view'} /> <br></br>
      {blog.url} <br></br>
      likes {blog.likes} <Button onClick={handleLike} text='like' /> <br></br>
      {blog.user.name}
      { loggedUser.username === blog.user.username && <div><Button onClick={handleDelete} text={'remove'} /></div> }
    </div>
  )

  const shortBlog = () => (
    <div className='blog'>
      {blog.title} {blog.author} <Button onClick={toggleView} text={fullView ? 'hide' : 'view'} />
    </div>
  )

  return (
    <div>
      {fullView ? fullBlog() : shortBlog()}
    </div>
  )
}

export default Blog
