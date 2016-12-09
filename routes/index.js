const express = require('express');
const passport = require('passport');
const router = express.Router()
const bcrypt = require('bcrypt');

const db = require('../db/db');

const saltRounds = 10
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/signup', (req,res) => {
  //console.log(req.body);
  let password = req.body.password
  let user = req.body.username
  let email = req.body.email
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username: user, password: hash, email: email}
    db.addUser(userObject)
    .then(() => res.redirect('/'))
  })
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router;
