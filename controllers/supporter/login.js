const { Supporter } = require('./../../models/adminModels')
const response = require('./../../helpers/responseHelper')
const { genJWTtoken } = require('./../../helpers/jwtHelper')
const { body, validationResult } = require('express-validator')
const { sha1 } = require('../../helpers')


module.exports.login = [
  body('username').optional(false),
  body('password').optional(false),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const supporter = await Supporter.findOne({
        username: req.body.username, room: req.body.room, password: sha1(req.body.password), active: true
      })
      if (!supporter)
        return response.error(res, 'Invalid username or password or wrong room', 401)

      response.success(res, genJWTtoken(supporter))
    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]


