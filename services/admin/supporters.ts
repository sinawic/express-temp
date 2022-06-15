import * as response from '../../helpers/responseHelper'
import { body, validationResult } from 'express-validator'
import { getSupporters, getSupporterDetails, createSupporter, editSupporter, deleteSupporter } from '../../repositories/supporter'
import { getRoomDetails } from '../../repositories/rooms'
import { NextFunction, Request, Response } from 'express'


const _getSupporters = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page || 1,
      paging = req.query.paging || 16

    const data = await getSupporters({ page, paging })

    response.success(res, data)
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

const _getSupporterDetails = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const supporter = await getSupporterDetails({ _id: req.params.id })
    if (supporter)
      response.success(res, supporter)
    else
      response.error(res, 'Supporter not found')
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

const _createSupporter = [
  body('username').optional(false).isLength({ min: 5 }),
  body('password').optional(false).isLength({ min: 5 }),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req: Request, res: Response, next: NextFunction) {
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
    } catch (err: any) {
      response.error(res, err.toString(), 400)
    }
  }]

const _editSupporter = [
  body('username').optional(false).isLength({ min: 5 }),
  body('password').optional(false).isLength({ min: 5 }),
  body('room').optional(false).isLength({ min: 24, max: 24 }),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { username, password } = req.body
      const supporter = await editSupporter({ _id: req.params.id, username, password })

      if (supporter)
        response.success(res, supporter)
      else
        response.error(res, 'Supporter not found')

    } catch (err: any) {
      response.error(res, err.toString(), 400)
    }
  }]

const _deleteSupporter = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const supporter = await deleteSupporter({ _id: req.params.id })
    if (supporter)
      response.success(res, supporter)
    else
      response.error(res, 'Supporter not found')
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

export {
  _getSupporters as getSupporters,
  _getSupporterDetails as getSupporterDetails,
  _createSupporter as createSupporter,
  _editSupporter as editSupporter,
  _deleteSupporter as deleteSupporter
}
