const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');


const getUserByUsername = require('./db/db');
const getUserById = require('./db/db');
//const getUsers = require('./db/db');


module.exports = function setup () {
  var strategy = new LocalStrategy ( (username, password, done) => {
    var user;
    db.getUserByUsername(username)
      .then((user) => {
        bcrypt.compare(password, user.password, (err,res) => {
          if (res) {
            return done (null, user)
          } else {
            return done (null)
          }
        })
      })
  })

  passport.use(strategy)

  passport.serializeUser( (err,done) => {
    done(null, user.id)
  })

  passport.deserializeUser( (id, done) => {
    getUserById(id)
      .then((user) => {
        done(null, (user) => {
          return user.id === id
        })
      })
  })
}
