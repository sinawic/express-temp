var crypto = require('crypto')

const connection_string = process.env.DB_CONNECTION_STRING,
  accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

function sha1(val) {
  var shasum = crypto.createHash('sha1')
  shasum.update(val)
  return shasum.digest('hex')
}


module.exports = {
  sha1, connection_string, accessTokenSecret
}
