const Knex = require('knex');
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

function getUsers() {
  return knex('users')
}

function getUserByUsername(username) {
  return knex('users')
          .where('username', `${username}`)
}

function getUserById(id) {
  return knex('users')
          .where('id', `${id}`)
}

function addUser(user) {
  return knex('users')
          .insert(user)
}

function getAdventure(user_id, adventure_id) {
  return knex('mapData')
          .where('user_id', `${user_id}`)
          .andWhere('adventure_id', `${adventure_id}`)
}

module.exports = {
  getUsers,
  getUserByUsername,
  getUserById,
  addUser,
  getAdventure
}
