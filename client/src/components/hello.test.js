import React from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'

import Hello from './hello'

let container = null
let root = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  root = createRoot(container)
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  act(() => { root.unmount() })
})

it('renders with or without a name', () => {
  act(() => { root.render(<Hello />) })
  expect(container.textContent).toBe('Hey, stranger')

  act(() => {
    root.render(<Hello name='Jenny' />)
  })
  expect(container.textContent).toBe('Hello, Jenny!')

  act(() => {
    root.render(<Hello name='Margaret' />)
  })
  expect(container.textContent).toBe('Hello, Margaret!')
})
