const { MongoClient } = require('mongodb')
const Db = process.env.ATLAS_URI
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let _db

async function connectToServer () {
  try {
    // Use connect method to connect to the Server
    await client.connect()
    _db = client.db(process.env.ATLAS_DB)
    console.log('Successfully connected to MongoDB.')
  } catch (err) {
    console.log(err.stack)
  }
}

function getDb () {
  return _db
}

module.exports = {
  connectToServer,
  getDb
}
