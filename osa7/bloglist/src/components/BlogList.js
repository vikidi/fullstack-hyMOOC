import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

import { List, ListItem, Divider } from '@material-ui/core'

import { createBlog } from '../reducers/blogReducer'

const ListItemLink = props => {
  return <ListItem button component={Link} {...props} />
}

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
      <h3>All Blogs</h3>

      <Togglable buttonLabel={'Create new'}>

        <CreateBlogForm CreateBlog={CreateBlog} />

      </Togglable>

      <Divider />

      <List>
        {blogs.map(blog =>
          <ListItemLink key={blog.id} to={`/blogs/${blog.id}`}><u>{blog.title}</u></ListItemLink>
        )}
      </List>
    </div>
  )
}

export default BlogList