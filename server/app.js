const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/todo/v1', require('./controllers/todoController'))
app.use((err, req, res, next) => {
  console.error('Path: ', req.path)
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
