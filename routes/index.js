const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const passport = require('../passportSetup');
const Passport = require('passport');

const db = require('../db/db');

const saltRounds = 10

function ensureAuthorised (req, res, next) {
  console.log("req.user",req.user);
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.send("Unauthorised")
  }
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/signup', (req,res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username, password: hash, email}
    db.addUser(userObject)
    .then(() => res.send(true))
    .catch((err) => console.log(err);)
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("posting to login", req.user)
  res.json({user: req.user})
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/api/v1/adventures', ensureAuthorised, (req, res) => {
  db.checkAdventureId(req.user.user_id)
    .then( (data) => {
      res.json({
        adventure_id: db.incrementAdventureId(data[0].lastAdventure_id)
      })
    })
})

router.post('/api/v1/adventures', ensureAuthorised, (req, res) => {
  const {user_id, adventure_id, lat, long} = req.body
  var adventureData = {user_id, adventure_id, lat, long}
  db.addAdventureData(adventureData)
    .then( (result) => {
      console.log(result)
    })
    .catch( (err) => {
      console.log(err);
    })
})

router.get('/api/v1/:userid/:adventureid', ensureAuthorised, (req,res) => {
  db.getAdventure(req.params.userid, req.params.adventureid)
    .then( (result) => {
      res.json(result)
    })
    .catch( (err) => {
      console.log(err);
    })
})


module.exports = router;
