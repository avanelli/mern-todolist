const dbo = require('../config/conn')
const request = require('supertest')
const todoapiv1 = require('../controllers/todoController')
const express = require('express')
const app = express()

const apiPath = '/api/todo/v1'
app.use(apiPath, todoapiv1)

beforeAll(async () => {
  await dbo.connectToServer()
})

describe('Test Todo Routes', function () {
  /* test(`responds to POST ${apiPath}`, async () => {
    const res = await (await request(app).post(apiPath)).send({ payload })
    expect(res.header['content-type']).toBe('application/json; charset=utf-8')
    expect(res.statusCode).toBe(200)
    expect(res.text).toEqual('hello world!')
  }) */

  test('responds empty array to GET /', async () => {
    const res = await request(app).get(apiPath)
    expect(res.header['content-type']).toBe('application/json; charset=utf-8')
    expect(res.statusCode).toBe(200)
    expect(res.text).toEqual('[]')
  })
})
