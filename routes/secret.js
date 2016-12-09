const express = require('express');
const router = express.Router()

router.get('/', ensureAuthenticated, (req, res, next) => {
  res.send('greetings' + req.user.username + 'auth template is working')
})

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/api/unauthorized')
}

module.exports = router
