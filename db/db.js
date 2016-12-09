const Knex = require('knex');
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

function getUsers() {
  return knex('users')
}

function getUserByUsername(username) {
  return knex('users')
          .where('username' === username)
}

function getUserById(id) {
  return knex('users')
          .where('id' === id)
}

function addUser(user) {
  return knex('users')
          .insert(user)
}

module.exports = {
  getUsers,
  getUserByUsername,
  getUserById,
  addUser
}
