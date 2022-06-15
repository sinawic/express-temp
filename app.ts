import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import routes from './routes'

var cors = require('cors')

var app = express()

app.use(cors())
app.options('*', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

routes(app)

// error handler
app.use('/', (req, res, next) => {
  res.status(404).send({ "404": "Not found" })
})

export default app
