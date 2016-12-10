const passport = require('passport');
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');


const db = require('./db/db');

createUserObj = (user) => {
  return {
    username: user.username,
    user_id: user.id
  }
}


passport.use(new Strategy ( (username, password, done) => {
  db.getUserByUsername(username)
    .then((user) => {
      console.log({user});
      bcrypt.compare(password, user[0].password, (err,res) => {
        if (res) {
          console.log({res});
          return done (null, createUserObj(user[0]))
        } else {
          return done (null)
        }
      })
    })
}))

//passport.use(strategy)

passport.serializeUser( (user, done) => {
  console.log("serial");
  done(null, user.user_id)
})

passport.deserializeUser( (id, done) => {
  console.log("deserial");
  db.getUserById(id)
    .then((user) => {
      done(null, createUserObj(user[0]))
    })
    .catch((err) => {
      console.log(err);
      done(err)
    })
})

module.exports = passport
