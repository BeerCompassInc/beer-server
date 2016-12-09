const express = require('express');
const passport = require('passport');
const router = express.Router()
const bcrypt = require('bcrypt');

const addUser = require('../db/db');

const saltRounds = 10

router.post ('/', (req,res) => {
  let password = req.body.password
  let user = req.body.username
  let email = req.body.email
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username: user, password: hash, email: email}
    addUser(userObject)
    .then(() => res.redirect('/login'))
  })
})

router.get('/', (req, res) => {
  res.render('signup')
})

module.exports = router
