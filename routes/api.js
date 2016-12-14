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

router.post('/signup', (req, res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err
    else {
      var userObject = {username, password: hash, email}
      db.addUser(userObject)
      .then(() => res.json({status: 200, message: 'OK'}))
      .catch((err) => {
        res.send(err)
      })
    }
  })
})

router.post('/quit', ensureAuthorised, (req, res) => {
  db.removeUser(req.user.user_id)
    .then((data) => {
      res.json({message: 'account removed'})
    })
    .catch((err) => {
      if (err) throw err
    })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({user: req.user})
})

router.post('/adventures', ensureAuthorised, (req, res) => {
  req.body.positions.forEach((mapPoint) => {
    const {user_id, adventure_id, lat, lng, time} = mapPoint
    var adventureData = {user_id, adventure_id, lat, lng, time}
    db.addAdventureData(adventureData)
    .then((result) => {
      res.json({status: 200, message: 'data saved'})
    })
    .catch((err) => {
      throw err
    })
  })
})

router.get('/adventures', ensureAuthorised, (req, res) => {
  db.getAdventures(req.user.user_id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      throw err
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
  db.deleteAdventure(req.user.user_id, req.params.adventureId)
  .then((data) => {
    res.json({message: 'adventure removed'})
  })
  .catch((err) => {
    throw err
  })
})

router.post('/adventures/:adventureId/update', ensureAuthorised, (req, res) => {
  console.log(req)
  db.updateAdventure(req.user.user_id, req.params.adventureId, req.body.adventureName)
  .then((data) => {
    res.json({status: 200, message: 'adventure name updated'})
  })
  .catch((err) => {
    throw err
  })
})

module.exports = router
