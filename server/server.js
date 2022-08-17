const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: './config/config.env' })

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/api/todo/v1', require('./controllers/todoController'))

// get driver connection
const dbo = require('./config/conn')

async function main () {
  try {
    await dbo.connectToServer()

    app.listen(port, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${port}`)
    })
  } catch (err) {
    console.log(err.stack)
    process.exit()
  }
}

main()
