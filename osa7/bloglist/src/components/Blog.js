import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { removeBlog, likeBlog, postComment } from '../reducers/blogReducer'

const Button = ({ onClick, text }) => {
  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Blog = ({ id }) => {
  const dispatch = useDispatch()

  const blog = useSelector(store => store.blogs.find(b => b.id === id))
  const user = useSelector(store => store.user)

  const [comment, setComment] = useState('')

  const handleDelete = async () => {
    dispatch(removeBlog(blog))
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(postComment(id, comment))

    setComment('')
  }

  if(!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br></br>
      likes <span className='likes' >{blog.likes}</span> <Button onClick={() => handleLike(blog)} text='like' /> <br></br>
      Added by {blog.user.name}
      { user.username === blog.user.username && <div><Button onClick={handleDelete} text={'remove'} /></div> }
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <input name='comment' type='text' placeholder='comment...' value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type='submit'>Post comment</button>
      </form>

      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}

export default Blog
