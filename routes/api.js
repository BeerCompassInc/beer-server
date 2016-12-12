const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('../passportSetup')

const db = require('../db/db')

const saltRounds = 10

function ensureAuthorised (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.send('Unauthorised')
  }
}

router.get('/api/v1', (req, res, next) => {
  console.log('Cheers!')
})

router.post('/signup', (req, res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err
    else {
      var userObject = {username, password: hash, email}
      db.addUser(userObject)
      .then(() => res.json({message: 'OK'}))
      .catch((err) => {
        res.json({message: 'user or email already exists'})
      })
    }
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({user: req.user})
})

router.post('/quit', ensureAuthorised, (req, res) => {
  db.removeUser(req.user.user_id)
    .then((data) => {
      res.json({message: 'account removed'})
    })
    .catch((err) => {
      res.json({message: 'could not remove account'})
    })
})

router.post('/adventures/new', ensureAuthorised, (req, res) => {
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

router.post('/adventures', ensureAuthorised, (req, res) => {
  req.body.positions.forEach((mapPoint) => {
    const {user_id, adventure_id, lat, lng, time} = mapPoint
    var adventureData = {user_id, adventure_id, lat, lng, time}
    console.log(adventureData);
    db.addAdventureData(adventureData)
    .then((result) => {
      res.json({message: 'data saved'})
    })
    .catch((err) => {
      throw err
    })
  })
})

router.get('/adventures', ensureAuthorised, (req, res) => {
  db.getAdventures(req.user.user_id)
    .then((result) => {
      console.log(result);
      res.json(result)
    })
    .catch((err) => {
      throw err
    })
})

router.get('/adventures/:adventureId', ensureAuthorised, (req, res) => {
  db.getAdventure(req.user.user_id, req.params.adventureId)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      throw err
    })
})

router.post('/adventures/:adventureId', ensureAuthorised, (req, res) => {
  db.deleteAdventure(req)
  .then((data) => {
    res.json({message: 'adventure removed'})
  })
  .catch((err) => {
    res.json({message: 'could not remove adventure'})
  })
})

module.exports = router
