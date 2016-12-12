const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const db = require('./db/db')

var createUserObj = (user) => {
  return {
    user_id: user.id,
    username: user.username
  }
}

passport.use(new Strategy((username, password, done) => {
  db.getUserByUsername(username)
    .then((user) => {
      if (user.length === 0) {
        done(null, false, {status: 404, message: 'user not found'})
      } else {
        bcrypt.compare(password, user[0].password, (err, res) => {
          if (err) throw err
          else if (res) {
            return done(null, createUserObj(user[0]))
          } else {
            return done(null)
          }
        })
      }
    })
    .catch((err) => {
      done(err)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.user_id)
})

passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((user) => {
      done(null, createUserObj(user[0]))
    })
    .catch((err) => {
      done(err)
    })
})

module.exports = passport
