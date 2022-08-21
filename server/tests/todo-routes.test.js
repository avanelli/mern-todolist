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

  test('Test insert new record, retrieve anche check data', async () => {
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

  test('updating and deleting a record', async () => {
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

    // read the inserted record
    const res3 = await request(app).get(apiPath + '/' + res2.body[0]._id)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res3.body).toEqual(expect.objectContaining(payload))

    // delete the inserted record
    const res4 = await request(app).delete(apiPath + '/' + res2.body[0]._id)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res4.body).toEqual(expect.objectContaining({
      deletedCount: 1
    }))
  })

  test('test get todo id not found', async () => {
    await request(app).get(apiPath + '/123456789012')
      .expect('Content-Type', /json/)
      .expect(404)
  })
  test('test delete todo id not found', async () => {
    const res = await request(app).delete(apiPath + '/123456789012')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body).toEqual(expect.objectContaining({
      deletedCount: 0
    }))
  })

  test('db error for all routes', async () => {
    // TODO try using spyOn to fake the gedDB function
    const oldDbo = dbo.getDb()
    dbo.setDb('')
    await request(app).get(apiPath)
      .expect(500)

    await request(app).get(apiPath + '/123456789012')
      .expect(500)

    await request(app).post(apiPath)
      .expect(500)
    await request(app).post(apiPath + '/123456789012')
      .expect(500)
    await request(app).delete(apiPath + '/123456789012')
      .expect(500)

    dbo.setDb(oldDbo)
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
