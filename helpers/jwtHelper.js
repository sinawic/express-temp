const jwt = require('jsonwebtoken')
const { getRequesterSupporter } = require('../repositories/supporter')

const genJWTtoken = (data, exp = Math.floor(Date.now() / 1000) + (60 * 60 * 60)) => {
  return jwt.sign({ data, exp }, process.env.ACCESS_TOKEN_SECRET)
}

const verifyJWTtoken = async (token) => {
  return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log(err)
      throw new Error({ message: "Unauthorized" })
    }

    const s = getRequesterSupporter(user)
    if (!s) throw new Error({ message: "Unauthorized" })

    return s
  })
}

module.exports = { genJWTtoken, verifyJWTtoken }