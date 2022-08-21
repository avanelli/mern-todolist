const dbo = require('../config/conn')
const ObjectId = require('mongodb').ObjectId
const collection = 'todo_objects'

async function find () {
  return await dbo.getDb().collection(collection)
    .find({})
    .toArray()
}

async function findById (id) {
  const myquery = { _id: ObjectId(id) }
  return await dbo.getDb().collection(collection).findOne(myquery)
}

async function add (todo) {
  return await dbo.getDb().collection(collection).insertOne(todo)
}

async function update (id, todo) {
  const myquery = { _id: ObjectId(id) }
  return await dbo.getDb().collection(collection).updateOne(
    myquery,
    { $set: todo }
  )
}

async function remove (id, todo) {
  const myquery = { _id: ObjectId(id) }
  return await dbo.getDb().collection(collection).deleteOne(myquery)
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}
