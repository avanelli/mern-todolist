'use strict'
const express = require('express')
const todoapiv1 = express.Router()
const Todo = require('../models/todoModel')

async function getTodos (req, res, next) {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (err) {
    next(err)
  }
}

async function getTodo (req, res, id, next) {
  try {
    const todo = await Todo.findById(id)
    if (todo) {
      res.json(todo)
    } else {
      res.status(404).json({ message: 'id not found.' })
    }
  } catch (err) {
    next(err)
  }
}

async function addTodo (req, res, next) {
  try {
    const newtodo = {
      title: req.body.title,
      content: req.body.content,
      level: req.body.level,
      dueDate: req.body.dueDate
    }
    const todo = await Todo.add(newtodo)
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

async function updateTodo (req, res, id, next) {
  try {
    const newtodo = {
      title: req.body.title,
      content: req.body.content,
      level: req.body.level,
      dueDate: req.body.dueDate
    }
    const todo = await Todo.update(id, newtodo)
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

async function deleteTodo (req, res, id, next) {
  try {
    const todo = await Todo.remove(id)
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

// routes
todoapiv1.get('/', function (req, res, next) {
  getTodos(req, res, next)
})

todoapiv1.get('/:id', function (req, res, next) {
  const { id } = req.params
  getTodo(req, res, id, next)
})

todoapiv1.post('/', function (req, res, next) {
  addTodo(req, res, next)
})

todoapiv1.post('/:id', function (req, res, next) {
  const { id } = req.params
  updateTodo(req, res, id, next)
})

todoapiv1.delete('/:id', function (req, res, next) {
  const { id } = req.params
  deleteTodo(req, res, id, next)
})

module.exports = todoapiv1
