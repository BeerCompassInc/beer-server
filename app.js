var port = process.env.PORT || '3000';
var express = require('express');
var app = express();
var path = require('path');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')(http)
//var passport = require('passport')
var flash = require('connect-flash')
const cors = require('cors');

var corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true
}

var http = require('http').Server(app)

var index = require('./routes/index');
var passport = require('./passportSetup')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({secret: 'I am the ow in the word now', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())
//setupPassport()

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function(socket) {
  console.log('connection made');
})

http.listen(port, function() {
  console.log('listening on localhost:3000');
})

// error handler

module.exports = app;
