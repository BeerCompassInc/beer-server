const express = require('express');
const passport = require('passport');
const router = express.Router()

router.post('/', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}))

router.get('/', (req, res) => {
  res.render('login')
})

module.exports = router
