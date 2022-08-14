import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
import Navbar from './components/navbar'
import TodoList from './components/todoList'
import TodoEdit from './components/todoEdit'
import TodoCreate from './components/todoCreate'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<TodoList />} />
        <Route path='/edit/:id' element={<TodoEdit />} />
        <Route path='/create' element={<TodoCreate />} />
      </Routes>
    </div>
  )
}

export default App
