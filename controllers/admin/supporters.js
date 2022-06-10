const { Supporter, Room } = require('./../../models/models')
const response = require('./../../helpers/responseHelper')
const { sha1 } = require('./../../helpers')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')


module.exports.getSupporters = async function (req, res, next) {
  try {
    const page = req.query.page || 1,
      paging = req.query.paging || 16
    let count = 1

    const supporters = await Supporter.aggregate([
      { $sort: { 'date_created': -1 } },
      { $limit: (parseInt(page) - 1) * parseInt(paging) + parseInt(paging) },
      { $skip: (parseInt(page) - 1) * parseInt(paging) }
    ])
    count = await Supporter.countDocuments({})

    response.success(res, { data: supporters, count })
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

module.exports.getSupporterDetails = async function (req, res, next) {
  try {
    const supporter = await Supporter.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    if (supporter)
      response.success(res, supporter)
    else
      response.error(res, 'Supporter not found')
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

module.exports.createSupporter = [
  body('username').optional(false).isLength({ min: 5 }),
  body('password').optional(false).isLength({ min: 5 }),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const room = await Room.findOne({ _id: new mongoose.Types.ObjectId(req.body.room) })
      if (!room)
        return response.error(res, 'Room not found', 400)

      const supporter = new Supporter({
        username: req.body.username,
        password: sha1(req.body.password),
        room: new mongoose.Types.ObjectId(req.body.room),
        date_created: new Date()
      })

      const result = await supporter.save()
      response.success(res, result)
    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]

module.exports.editSupporter = [
  body('username').optional(false).isLength({ min: 5 }),
  body('password').optional(false).isLength({ min: 5 }),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const supporter = await Supporter.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, {
        username: req.body.username,
        password: sha1(req.body.password)
      })

      if (supporter)
        response.success(res, supporter)
      else
        response.error(res, 'Supporter not found')

    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]

module.exports.deleteSupporter = async function (req, res, next) {
  try {
    const supporter = await Supporter.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
    if (supporter)
      response.success(res, supporter)
    else
      response.error(res, 'Supporter not found')
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

