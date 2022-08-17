
/*
afterAll(async () => {
  await dbo.close()
  })
*/
describe('Test MongoDB connection', function () {
  jest.setTimeout(30000)
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })
  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  test('working connection', async () => {
    const dbo = require('../config/conn')
    await expect(dbo.connectToServer())
      .resolves.not.toThrow()
  })

  test('not working connection', async () => {
    process.env.ATLAS_URI = 'mongodb://dymmy'
    process.env.DB_CONNECT_TIMEOUT = 50
    const dbo = require('../config/conn')

    await expect(dbo.connectToServer())
      .rejects
      .toThrow()
  })
})
