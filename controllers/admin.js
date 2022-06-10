const { Room } = require('./../models/models')
const response = require('./../helpers/responseHelper')
const mongoose = require('mongoose')

module.exports.getRooms = async function (req, res, next) {
  try {
    const rooms = await Room.find({})
    response.success(res, rooms)
  } catch (err) {
    response.error(res, err)
  }
}


module.exports.getRoomDetails = async function (req, res, next) {
  try {
    const room = await Room.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    response.success(res, room)
  } catch (err) {
    response.error(res, err)
  }
}

