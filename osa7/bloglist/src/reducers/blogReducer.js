import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {

  case 'INIT_BLOGS':
    return action.data

  case 'CREATE_BLOG':
    return [
      ...state,
      action.data
    ]

  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id)

  case 'LIKE_BLOG':
    return state.map(b => b.id === action.id ? { ...b, likes: b.likes + 1 } : b)

  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    try {
      const b = await blogService.create(blog)

      dispatch({
        type: 'CREATE_BLOG',
        data: { ...b, user }
      })

      dispatch(setNotification(`a new blog '${b.title}' by ${b.author} created`))
    }
    catch(err) {
      setNotification('wrong credentials', true)
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)

      dispatch({
        type: 'REMOVE_BLOG',
        id: blog.id
      })
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.update(blog.id, newBlog)

    dispatch({
      type: 'LIKE_BLOG',
      id: blog.id
    })
  }
}

export default reducer