const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const passport = require('../passportSetup');
const Passport = require('passport');

const db = require('../db/db');

const saltRounds = 10

function ensureAuthorised (req, res, next) {
  console.log("req.user",req.user);
  //console.log(res);
  if (req.isAuthenticated()) {
    console.log("YES");
    return next()
  } else {
    console.log("NO");
    res.send("Unauthorised")
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/signup', (req,res) => {
  const {username, password, email} = req.body
  bcrypt.hash(password, saltRounds, (err, hash) => {
    var userObject = {username, password: hash, email}
    db.addUser(userObject)
    .then((id) => res.json({id}))
  })
})

// router.get('/login', (req,res) => {
//   res.render('login')
// })

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("posting to login", req.user)
  res.json({user: req.user})
})

router.get('/signup', (req, res) => {
  res.render('signup')
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
