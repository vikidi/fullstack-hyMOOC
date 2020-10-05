import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  test('', async () => {
    const CreateBlog = jest.fn()

    const component = render(
      <CreateBlogForm CreateBlog={CreateBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing title' }
    })
    fireEvent.change(author, {
      target: { value: 'testing author' }
    })
    fireEvent.change(url, {
      target: { value: 'testing url' }
    })
    fireEvent.submit(form)

    expect(CreateBlog.mock.calls).toHaveLength(1)

    const newBlog = CreateBlog.mock.calls[0][0]
    expect(newBlog.title).toBe('testing title')
    expect(newBlog.author).toBe('testing author')
    expect(newBlog.url).toBe('testing url')
  })
})