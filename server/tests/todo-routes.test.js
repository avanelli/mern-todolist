/* const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbo = require('../config/conn')
const request = require('supertest')
const todoapiv1 = require('../controllers/todoController')
*/
const request = require('supertest')
const dbo = require('../config/conn')
const apiPath = '/api/todo/v1'
const app = require('../app')

beforeAll(async () => {
  await dbo.connectToServer()
})

describe('Test Todo REST routes', function () {
  test('responds empty array to GET /', async () => {
    const res = await request(app).get(apiPath)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.text).toEqual('[]')
  })

  test(`responds to POST ${apiPath} inserting new record`, async () => {
    const payload = { title: 'test title', content: 'test content', level: 'Mid', dueDate: '2022-09-01T16:17:14.000Z' }
    const res = await request(app).post(apiPath)
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).toEqual(expect.objectContaining({
      insertedId: expect.any(String)
    }))

    // read the inserted record
    const res2 = await request(app).get(apiPath)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res2.body[0]._id).toEqual(res.body.insertedId)
  })

  test(`responds to POST ${apiPath}/:id updating a record`, async () => {
    // read first record
    const res2 = await request(app).get(apiPath)
      .expect('Content-Type', /json/)
      .expect(200)

    // POST new data
    const payload = { title: 'test changed title', content: 'test content', level: 'Mid', dueDate: '2022-09-01T16:17:14.000Z' }
    const res = await request(app).post(apiPath + '/' + res2.body[0]._id)
      .set('Accept', 'application/json')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).toEqual(expect.objectContaining({
      modifiedCount: 1,
      matchedCount: 1
    }))
  })

  test('db error', async () => {
    dbo.setDb('')
    const res = await request(app).get(apiPath)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.text).toEqual('[]')
  })
  /*
  /insert
  post

insertedit
XHRPOSThttp://localhost:5000/api/todo/v1/62f35da34e2e8eb1285e160d
[HTTP/1.1 200 OK 155ms]

1

{"title":"prova edit","content":"prova edit content","level":"Low","dueDate":"2022-09-30T07:26:18.000Z"}

*/
})
