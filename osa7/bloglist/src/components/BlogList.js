import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  })

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
        <div key={blog.id} className='blog'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
      )}
    </div>
  )
}

export default BlogList