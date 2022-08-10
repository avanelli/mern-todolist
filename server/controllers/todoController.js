"use strict";
const express = require("express");
var todoapiv1 = express.Router();
const Todo = require("../models/todoModel");

async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
}

async function getTodo(req, res, id) {
  try {
    const todo = await Todo.findById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "id not found." });
    }
  } catch (error) {
    console.log(error);
  }
}

async function addTodo(req, res, id) {
  try {
    const newtodo = {
      title: req.body.title,
      content: req.body.content,
      level: req.body.level,
      dueDate: req.body.dueDate,
    };
    const todo = await Todo.add(newtodo);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "creation error" });
    }
  } catch (error) {
    console.log(error);
  }
}

// routes
todoapiv1.get("/", function (req, res) {
  getTodos(req, res);
});

todoapiv1.get("/:id", function (req, res) {
  const { id } = req.params;
  getTodo(req, res, id);
});

todoapiv1.post("/", function (req, res) {
  addTodo(req, res);
});

module.exports = todoapiv1;
