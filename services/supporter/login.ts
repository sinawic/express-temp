import * as response from './../../helpers/responseHelper'
import { getSupporterByCred } from './../../repositories/supporter'
import { genJWTtoken } from './../../helpers/jwtHelper'
import { body, validationResult } from 'express-validator'


export const login = [
  body('username').optional(false),
  body('password').optional(false),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { username, room, password } = req.body

      const supporter = await getSupporterByCred({ username, room, password })
      if (!supporter)
        return response.error(res, 'Invalid username or password or wrong room', 401)

      response.success(res, genJWTtoken(supporter))
    } catch (err) {
      response.error(res, err.toString(), 400)
    }
  }]


