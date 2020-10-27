import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { removeBlog, likeBlog } from '../reducers/blogReducer'

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

  const handleDelete = async () => {
    dispatch(removeBlog(blog))
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a> <br></br>
      likes <span className='likes' >{blog.likes}</span> <Button onClick={() => handleLike(blog)} text='like' /> <br></br>
      Added by {blog.user.name}
      { user.username === blog.user.username && <div><Button onClick={handleDelete} text={'remove'} /></div> }
    </div>
  )
}

export default Blog
