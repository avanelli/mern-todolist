const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/todo/v1', require('./controllers/todoController'))

module.exports = app
