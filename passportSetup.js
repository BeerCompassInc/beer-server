const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');


const db = require('./db/db');


module.exports = function setup () {
  var strategy = new LocalStrategy ( (username, password, done) => {
    db.getUserByUsername(username)
      .then((user) => {
        console.log(user[0].password);
        bcrypt.compare(password, user[0].password, (err,res) => {
          if (res) {
            return done (null, user)
          } else {
            return done (null)
          }
        })
      })
  })

  passport.use(strategy)

  passport.serializeUser( (user, done) => {
    done(null, user[0].id)
  })

  passport.deserializeUser( (id, done) => {
    db.getUserById(id)
      .then((user) => {
        done(null, (user) => {
          return user.id === id
        })
      })
  })
}
