const Knex = require('knex');
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

function getUsers() {
  return knex('users')
}

function getUserByUsername(username) {
  return knex('users').where('username', `${username}`)
}

function getUserById(id) {
  return knex('users').where('id', `${id}`)
}

function addUser(user) {
  return knex('users').insert(user)
}

function removeUser(id) {
  return knex('users')
          .where('id', `${id}`)
          .del()
}

function getAdventure(user_id, adventure_id) {
  return knex('mapData')
          .where('user_id', `${user_id}`)
          .andWhere('adventure_id', `${adventure_id}`)
}

function getAdventures(user_id) {
  return knex('mapData')
          .where('user_id', `${user_id}`)
}

function checkAdventureId(user_id) {
  return knex('mapData')
          .max('adventure_id as lastAdventure_id')
          .where('user_id', `${user_id}`)
}

function incrementAdventureId(lastAdventure_id) {
  var adventure_id;
  if (lastAdventure_id === null) {
    adventure_id = 1
    return adventure_id
  } else {
    adventure_id = lastAdventure_id+1
    return adventure_id
  }
}

function addAdventureData(adventureData) {
  return knex('mapData').insert(adventureData)
}

function deleteAdventure(user_id, adventure_Id) {
  return knex('mapData')
          .where('user_id', `${user_id}`)
          .andWhere('adventure_id', `${adventure_id}`)
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
