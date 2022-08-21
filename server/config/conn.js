const { MongoClient } = require('mongodb')
const Db = process.env.ATLAS_URI
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: process.env.DB_CONNECT_TIMEOUT,
  serverSelectionTimeoutMS: process.env.DB_CONNECT_TIMEOUT
})

let _db

async function connectToServer () {
  // Use connect method to connect to the Server
  await client.connect()
  _db = client.db(process.env.ATLAS_DB)
}

function getDb () {
  return _db
}
function setDb (db) {
  _db = db
}

module.exports = {
  connectToServer,
  getDb,
  setDb
}
