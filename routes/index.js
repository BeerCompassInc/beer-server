const express = require('express');
const router = express.Router()
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../db/db');

const saltRounds = 10
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/signup', (req,res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username: username, password: hash, email: email}
    db.addUser(userObject)
    .then(() => res.redirect('/'))
  })
})

router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}))

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/secret', (req, res) => {
  res.render('secret')
})

router.get('/api/v1/:userid/:adventureid', (req,res) => {
  db.getAdventure(req.params.userid, req.params.adventureid)
    .then( (result) => {
      res.json(result)
    })
    .catch( (err) => {
      console.log(err);
    })
})

module.exports = router;
