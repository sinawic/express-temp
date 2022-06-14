const response = require('../../helpers/responseHelper')
const { body, validationResult } = require('express-validator')
const { getSupporters, getSupporterDetails, createSupporter, editSupporter, deleteSupporter } = require('../../repositories/supporter')
const { getRoomDetails } = require('../../repositories/rooms')


module.exports.getSupporters = async function (req, res, next) {
  try {
    const page = req.query.page || 1,
      paging = req.query.paging || 16

    const data = await getSupporters({ page, paging })

    response.success(res, data)
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

module.exports.getSupporterDetails = async function (req, res, next) {
  try {
    const supporter = await getSupporterDetails({ _id: req.params.id })
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

      const room = await getRoomDetails({ _id: req.body.room })
      if (!room)
        return response.error(res, 'Room not found', 400)

      const { username, password } = req.body

      const supporter = await createSupporter({
        username,
        password,
        room
      })
      response.success(res, supporter)
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

      const { username, password } = req.body
      const supporter = await editSupporter({ _id: req.params.id, username, password })

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
    const supporter = await deleteSupporter({ _id: req.params.id })
    if (supporter)
      response.success(res, supporter)
    else
      response.error(res, 'Supporter not found')
  } catch (err) {
    response.error(res, err.toString(), 400)
  }
}

