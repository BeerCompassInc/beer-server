const app = require('../app')
const request = require('supertest')
const test = require('tape')

// DELETE dev.sqlite3 FROM PROJECT ROOT and in terminal knex migrate:latest and knex seed:run PRIOR TO TESTING

test('POST to signup route', t => {
  request(app)
    .post('/api/v1/signup')
    .send({username: 'test', password: 'test', email: 'testtest.com'})
    .end((err, res) => {
      //fails if user or email exists
      t.false(err, 'error from posting to signup is null')
      t.true(res, 'Response is truthy')
      t.end()
    })
})

test('POST to login route', t => {
  request(app)
    .post('/api/v1/login')
    .send({username: 'test', password: 'test', email: 'test@test.com'})
    .end((err, res) => {
      t.true(res.status !== 401, "Unauthorized");
      t.deepEqual(res.body.user, {user_id: 1, username: 'test'}, 'Login returns the expected object')
      t.end()
    })
})
