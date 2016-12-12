const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

function getUsers () {
  return knex('users')
}

function getUserByUsername (username) {
  return knex('users').where('username', `${username}`)
}

function getUserById (id) {
  return knex('users').where('id', `${id}`)
}

function addUser (user) {
  return knex('users').insert(user)
}

function removeUser (id) {
  return knex('users')
          .where('id', `${id}`)
          .del()
}

function getAdventure (userId, adventureId) {
  return knex('mapData')
          .where('user_id', `${userId}`)
          .andWhere('adventure_id', `${adventureId}`)
}

function getAdventures (userId) {
  return knex('mapData')
          .where('user_id', `${userId}`)
}

function checkAdventureId (userId) {
  return knex('mapData')
          .max('adventure_id as lastAdventure_id')
          .where('user_id', `${userId}`)
}

function incrementAdventureId (lastAdventureId) {
  var adventure_id
  if (lastAdventureId === null) {
    adventure_id = 1
    return adventure_id
  } else {
    adventure_id = lastAdventureId + 1
    return adventure_id
  }
}

function addAdventureData (adventureData) {
  return knex('mapData').insert(adventureData)
}

function deleteAdventure (userId, adventureId) {
  return knex('mapData')
          .where('user_id', `${userId}`)
          .andWhere('adventure_id', `${adventureId}`)
          .del()
}

module.exports = {
  getUsers,
  getUserByUsername,
  getUserById,
  addUser,
  getAdventure,
  getAdventures,
  checkAdventureId,
  incrementAdventureId,
  addAdventureData,
  removeUser,
  deleteAdventure
}
