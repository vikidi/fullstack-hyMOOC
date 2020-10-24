import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('Correct content is renderer at first', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Ville Saarinen',
      likes: 3,
      url: 'localhost',
      user: 'some user'
    }

    const component = render(
      <Blog blog={blog} setBlogs={() => {}} loggedUser={{}} likeHandler={() => {}} />
    )

    const content = component.container.querySelector('.blog').textContent
    expect(content).toContain(blog.title)
    expect(content).toContain(blog.author)
    expect(content).not.toContain(blog.likes)
    expect(content).not.toContain(blog.url)
  })

  test('Likes and url also shown after view click', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Ville Saarinen',
      likes: 3,
      url: 'localhost',
      user: 'some user'
    }

    const component = render(
      <Blog blog={blog} setBlogs={() => {}} loggedUser={{}} likeHandler={() => {}} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const content = component.container.querySelector('.blog').textContent
    expect(content).toContain(blog.title)
    expect(content).toContain(blog.author)
    expect(content).toContain(blog.likes)
    expect(content).toContain(blog.url)
  })

  test('Pressing like twice triggers event handler twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Ville Saarinen',
      likes: 3,
      url: 'localhost',
      user: 'some user'
    }

    const mockFunc = jest.fn()

    const component = render(
      <Blog blog={blog} setBlogs={() => {}} loggedUser={{}} likeHandler={mockFunc} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockFunc.mock.calls).toHaveLength(2)
  })
})