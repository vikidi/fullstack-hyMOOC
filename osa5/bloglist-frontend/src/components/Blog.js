import React, { useState } from 'react'
import blogs from '../services/blogs'

import blogService from '../services/blogs'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Blog = ({ blog, setBlogs }) => {
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

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const fullBlog = () => (
    <div className='blog'>
      {blog.title} {blog.author} <Button onClick={toggleView} text={fullView ? 'hide' : 'view'} /> <br></br>
      {blog.url} <br></br>
      likes {blog.likes} <Button onClick={handleLike} text='like' /> <br></br>
      {blog.user.name}
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
