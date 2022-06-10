const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const { Supporter } = require('./../models/models')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log(err)
          return res.status(401).json({ message: "Unauthorized" })
        }

        const s = await Supporter.findOne({
          _id: new mongoose.Types.ObjectId(user.data._id),
          room: new mongoose.Types.ObjectId(user.data.room), active: true
        })

        if (!s) return res.status(401).json({ message: "Unauthorized" })

        req.user = s
        next()
      })
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: "Unauthorized" })
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" })
  }
}