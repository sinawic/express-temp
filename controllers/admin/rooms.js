const { Room } = require('./../../models/models')
const response = require('./../../helpers/responseHelper')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')


module.exports.getRooms = async function (req, res, next) {
  try {
    const page = req.query.page || 1,
      paging = req.query.paging || 16
    let count = 1

    const rooms = await Room.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (parseInt(page) - 1) * parseInt(paging) + parseInt(paging) },
      { $skip: (parseInt(page) - 1) * parseInt(paging) }
    ])
    count = await Room.countDocuments({})

    response.success(res, { data: rooms, count })
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

module.exports.getRoomDetails = async function (req, res, next) {
  try {
    const room = await Room.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    if (room)
      response.success(res, room)
    else
      response.error(res, 'Room not found')
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

module.exports.createRoom = [
  body('name').optional(false).isLength({ min: 5 }),
  body('email').optional(false).isEmail(),
  body('website').optional(false).isLength({ min: 5 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const room = new Room({
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        date_created: new Date()
      })

      const result = await room.save()
      response.success(res, result)
    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]

module.exports.editRoom = [
  body('name').optional(false).isLength({ min: 5 }),
  body('email').optional(false).isEmail(),
  body('website').optional(false).isLength({ min: 5 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const room = await Room.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, {
        name: req.body.name,
        email: req.body.email,
        website: req.body.website
      })

      if (room)
        response.success(res, room)
      else
        response.error(res, 'Room not found')

    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]

module.exports.deleteRoom = async function (req, res, next) {
  try {
    const room = await Room.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
    if (room)
      response.success(res, room)
    else
      response.error(res, 'Room not found')
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

