const app = require('../app')
const request = require('supertest')
const test = require('tape')

test('POST to signup route', t => {
  request(app)
    .post('/api/v1/signup')
    .send({username: 'test', password: 'test', email: 'test@test.com'})
    .end((err, res) => {

    })
})
