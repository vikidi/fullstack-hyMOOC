import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

import { createBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  })

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const CreateBlog = async (newBlog) => {
    dispatch(createBlog(newBlog, user))
  }

  return (
    <div>
      <Togglable buttonLabel={'Create new'}>

        <CreateBlogForm CreateBlog={CreateBlog} />

      </Togglable>

      <br></br>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={user} likeHandler={handleLike} />
      )}
    </div>
  )
}

export default BlogList