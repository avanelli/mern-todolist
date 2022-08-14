import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Todo = (props) => (
  <tr>
    <td>{props.todo.title}</td>
    <td>{props.todo.content}</td>
    <td>{props.todo.level}</td>
    <td>{props.todo.dueDate}</td>
    <td>
      <Link className='btn btn-link' to={`/edit/${props.todo._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className='btn btn-link'
        onClick={() => {
          props.deleteTodo(props.todo._id)
        }}
      >
        Delete
      </button>
    </td>
  </tr>
)

export default function TodoList () {
  const todoApiEndpoint = '/api/todo/v1'
  const [todos, setTodos] = useState([])

  // This method fetches the todos from the database.
  useEffect(() => {
    async function getTodos () {
      try {
        const response = await fetch(
          `http://localhost:5000${todoApiEndpoint}/`
        )

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`
          console.log(message)
          return
        }

        const todos = await response.json()
        setTodos(todos)
      } catch (err) {
        const message = `An error occurred: ${err.message}`
        console.log(message)
      }
    }
    // FIX this get called 2 times on page load
    getTodos()
    console.log('loaded ' + todos.length)
  }, [todos.length])

  // This method will delete a todo
  async function deleteTodo (id) {
    const todoApiEndpoint = '/api/todo/v1'
    await fetch(`http://localhost:5000${todoApiEndpoint}/${id}`, {
      method: 'DELETE'
    })

    const newTodos = todos.filter((el) => el._id !== id)
    setTodos(newTodos)
  }

  // This method will map out the todos on the table
  function todoList () {
    return todos.map((todo) => {
      return (
        <Todo
          todo={todo}
          deleteTodo={() => deleteTodo(todo._id)}
          key={todo._id}
        />
      )
    })
  }

  // This following section will display the table with the todos.
  return (
    <div>
      <h3>Todo List</h3>
      <table className='table table-striped' style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Level</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{todoList()}</tbody>
      </table>
    </div>
  )
}
