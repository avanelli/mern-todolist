require('dotenv').config({ path: './config/config.env' })
const app = require('./app')

// get driver connection
const dbo = require('./config/conn')

async function main () {
  try {
    await dbo.connectToServer()

    const port = process.env.PORT || 5000
    app.listen(process.env.PORT || 5000, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${port}`)
    })
  } catch (err) {
    console.log(err.stack)
    process.exit()
  }
}

main()
