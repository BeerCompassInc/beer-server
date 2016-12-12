const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true
}

var api = require('./routes/api')
var passport = require('./passportSetup')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('express-session')({secret: 'I am the ow in the word now', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', api)

module.exports = app
