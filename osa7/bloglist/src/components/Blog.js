import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, TextField, List, ListItem } from '@material-ui/core'

import { removeBlog, likeBlog, postComment } from '../reducers/blogReducer'

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
      likes <span className='likes' >{blog.likes}</span> <Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={() => handleLike(blog)}>like</Button> <br></br>
      Added by {blog.user.name}
      {user && user.username === blog.user.username && <div><Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={handleDelete}>remove</Button></div> }
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <TextField variant='outlined' label='Comment' name='comment' type='text' value={comment} onChange={({ target }) => setComment(target.value)} />
        <Button style={{ margin: '5px' }} variant='contained' color='primary' type='submit'>Post comment</Button>
      </form>

      <List>
        {blog.comments.map((c, i) => <ListItem key={i}>{`${i + 1}. ${c}`}</ListItem>)}
      </List>
    </div>
  )
}

export default Blog
