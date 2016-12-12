const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const passport = require('../passportSetup');
const Passport = require('passport');

const db = require('../db/db');

const saltRounds = 10

function ensureAuthorised (req, res, next) {
  console.log("req.user - ensureAuthorised", req.user);
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.send("Unauthorised")
  }
}

router.get('/', (req, res, next) => {
  res.render('index', { title: 'BEER-SERVER' });
});

router.get('/api/v1', (req, res, next) => {
  res.render('index', {title: 'BEER-SERVER API'})
})

router.post ('/api/v1/signup', (req,res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username, password: hash, email}
    db.addUser(userObject)
    .then(() => res.json({status: 201, message: OK}))
    .catch((err) => res.json({status: 409, message: "user or email already exists" }))
  })
})

router.post('/api/v1/login', passport.authenticate('local'), (req, res) => {
  res.json({user: req.user})
})

router.post('/api/v1/quit', ensureAuthorised, (req, res) => {
  db.removeUser(req.user.user_id)
    .then((data) => {
      res.json({status: 200, message: "account removed"});
    })
    .catch((err) => {
      res.json({status: 400, message: "could not remove account"})
    })
})

router.post('/api/v1/newAdventure', ensureAuthorised, (req, res) => {
  db.checkAdventureId(req.user.user_id)
    .then((data) => {
      res.json({
        adventure_id: db.incrementAdventureId(data[0].lastAdventure_id)
      })
    })
    .catch((err) => {
      throw err
    })
})

router.post('/api/v1/saveAdventure', ensureAuthorised, (req, res) => {
  const {user_id, adventure_id, lat, long} = req.body
  var adventureData = {user_id, adventure_id, lat, long}
  db.addAdventureData(adventureData)
    .then((result) => {
      res.json({status: 201, message: "data saved"})
    })
    .catch((err) => {
      throw err
    })
})

router.get('/api/v1/adventures', ensureAuthorised, (req,res) => {
  db.getAdventures(req.user.user_id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      throw err
    })
})

router.get('/api/v1/adventures/:adventureId', ensureAuthorised, (req, res) => {
  db.getAdventure(req.user.user_id, req.params.adventureId)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      throw err
    })
})

router.post('/api/v1/adventures/:adventureId', ensureAuthorised, (req, res) => {
  db.deleteAdventure(req)
  .then((data) => {
    res.json({status: 200, message: "adventure removed"});
  })
  .catch((err) => {
    res.json({status: 400, message: "could not remove adventure"})
  })
})

module.exports = router;
