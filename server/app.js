const express = require('express')
const app = express()
const cors = require('cors')
const pino = require('pino')({ level: process.env.LOG_LEVEL })
const logger = require('pino-http')({ logger: pino })

app.use(logger)
app.use(cors())
app.use(express.json())
app.use('/api/todo/v1', require('./controllers/todoController'))
app.use((err, req, res, next) => {
  // logger(req, res)
  req.log.error('Path: ', req.path)
  req.log.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
