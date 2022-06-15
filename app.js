var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var cors = require('cors')

var app = express()

app.use(cors())
app.options('*', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

require("./routes")(app)

// error handler
app.use('/', (req, res, next) => {
  res.status(404).send({ "404": "Not found" })
})

module.exports = app
