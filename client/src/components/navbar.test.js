import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'

import Navbar from './navbar'

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
  act(() => { root.render(<BrowserRouter><Navbar /></BrowserRouter>) })
  expect(container.textContent).toBe('Create Record')
})
