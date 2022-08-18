const dbo = require('../config/conn')
const ObjectId = require('mongodb').ObjectId

function find () {
  return new Promise((resolve, reject) => {
    // add try catch
    const db = dbo.getDb()
    db.collection('todo_objects')
      .find({})
      .toArray(function (err, result) {
        if (err) reject(err)
        resolve(result)
      })
  })
}

function findById (id) {
  return new Promise((resolve, reject) => {
    const db = dbo.getDb()
    const myquery = { _id: ObjectId(id) }
    db.collection('todo_objects').findOne(myquery, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

function add (todo) {
  return new Promise((resolve, reject) => {
    const db = dbo.getDb()
    db.collection('todo_objects').insertOne(todo, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

function update (id, todo) {
  return new Promise((resolve, reject) => {
    const db = dbo.getDb()
    const myquery = { _id: ObjectId(id) }
    db.collection('todo_objects').updateOne(
      myquery,
      { $set: todo },
      function (err, result) {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

function remove (id, todo) {
  return new Promise((resolve, reject) => {
    const db = dbo.getDb()
    const myquery = { _id: ObjectId(id) }
    db.collection('todo_objects').deleteOne(myquery, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}
