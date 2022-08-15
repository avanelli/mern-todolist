import React from 'react'

// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
import Navbar from './components/navbar'
import TodoList from './components/todoList'
import TodoEdit from './components/todoEdit'
import TodoCreate from './components/todoCreate'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<TodoList />} />
        <Route path='/edit/:id' element={<TodoEdit />} />
        <Route path='/create' element={<TodoCreate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
