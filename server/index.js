'use strict'

var _express = _interopRequireDefault(require('express'))

var _bodyParser = _interopRequireDefault(require('body-parser'))

var _mysql = _interopRequireDefault(require('mysql'))

var _bcrypt = _interopRequireDefault(require('bcrypt'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var port = 3000
var saltRounds = 10
var app = (0, _express['default'])()

var con = _mysql['default'].createConnection({
  host: 'localhost',
  user: 'login',
  password: '1234',
  database: 'login'
})

con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + con.threadId)
})
app.use(_express['default']['static']('dist/'))
app.use(_bodyParser['default'].urlencoded({
  extended: true
}))
app.use(_bodyParser['default'].json())

var authUser = function authUser (res, username, password, hash) {
  _bcrypt['default'].compare(password, hash, function (err, rightPasswd) {
    console.log(password)
    console.log(hash)

    if (err) {
      console.error(err.stack)
      return
    }

    if (rightPasswd) res.send('correct login!'); else res.send('incorrect login! :(')
  })
}

app.post('/auth', function (req, res) {
  var uname = req.body.username
  var passwd = req.body.password
  var query = "SELECT hash FROM users WHERE username = '".concat(uname, "';")
  con.query(query, function (err, data) {
    if (err) console.error(err)

    if (data.length) {
      authUser(res, uname, passwd, data[0].hash)
    } else res.send('user not found')
  })
})

function addUser (username, password) {
  _bcrypt['default'].hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.error(err)
      return
    }

    var query = "INSERT INTO users(username, hash) VALUES('".concat(username, "', '").concat(hash, "');")
    con.query(query, function () {
      console.log('Inserted user '.concat(username))
    })
  })
}

app.post('/add-user', function (req, res) {
  var uname = req.body.username
  var passwd = req.body.password
  var queryUserAlreadyExists = "SELECT * FROM users WHERE username = '".concat(uname, "'")
  con.query(queryUserAlreadyExists, function (err, data) {
    if (err) console.error(err)

    if (data.length) {
      res.send('user already exists')
      return
    }

    addUser(uname, passwd)
  })
})
app.listen(port, function () {
  console.log('Listening on port '.concat(port))
})
