require('dotenv').config({ path: './tests/.env' })
process.env.ATLAS_URI = process.env.MONGO_URL
