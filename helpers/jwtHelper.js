const jwt = require('jsonwebtoken')

const genJWTtoken = (data, exp = Math.floor(Date.now() / 1000) + (60 * 60 * 60)) => {
  return jwt.sign({ data, exp }, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = { genJWTtoken }