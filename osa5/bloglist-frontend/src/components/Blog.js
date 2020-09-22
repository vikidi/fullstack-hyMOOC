import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Blog = ({ blog }) => {
  const [ fullView, setFullView ] = useState(false)

  const toggleView = () => {
    setFullView(!fullView)
  }

  const handleLike = () => {

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
