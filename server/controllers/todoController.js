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

todoapiv1.get("/", function (req, res) {
  getTodos(req, res);
});

module.exports = todoapiv1;
