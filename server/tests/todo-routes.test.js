const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbo = require('../config/conn')
const request = require('supertest')
const todoapiv1 = require('../controllers/todoController')

const apiPath = '/api/todo/v1'
app.use(apiPath, todoapiv1)

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
    console.log(res.body)
    expect(res.body.insertedId).toEqual('hello world!')
  })

  test('responds empty array to GET /', async () => {
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
