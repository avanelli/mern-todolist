import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function TodoEdit () {
  const todoApiEndpoint = '/api/todo/v1'
  const [form, setForm] = useState({
    title: '',
    content: '',
    level: '',
    dueDate: new Date(),
    records: []
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData () {
      const id = params.id.toString()
      const response = await fetch(
        `http://localhost:5000${todoApiEndpoint}/${params.id.toString()}`
      )

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const record = await response.json()
      if (!record) {
        window.alert(`Record with id ${id} not found`)
        navigate('/')
        return
      }

      setForm(record)
    }

    fetchData()
  }, [params.id, navigate])

  // These methods will update the state properties.
  function updateForm (value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function onSubmit (e) {
    e.preventDefault()
    const editedTodo = {
      title: form.title,
      content: form.content,
      level: form.level,
      dueDate: form.dueDate
    }

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000${todoApiEndpoint}/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(editedTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    navigate('/')
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            className='form-control'
            id='title'
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Content: </label>
          <input
            type='textarea'
            className='form-control'
            id='content'
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='levelOptions'
              id='levelHigh'
              value='High'
              checked={form.level === 'High'}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor='levelHigh' className='form-check-label'>
              High
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='levelOptions'
              id='levelMid'
              value='Mid'
              checked={form.level === 'Mid'}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor='levelMid' className='form-check-label'>
              Mid
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='levelOptions'
              id='levelLow'
              value='Low'
              checked={form.level === 'Low'}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor='levelLow' className='form-check-label'>
              Low
            </label>
          </div>

          <div className='form-group'>
            <DatePicker
              selected={Date.parse(form.dueDate)}
              onChange={(date) => updateForm({ dueDate: date })}
            />
          </div>
        </div>
        <br />

        <div className='form-group'>
          <input
            type='submit'
            value='Update Record'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}
