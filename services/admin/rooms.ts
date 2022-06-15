import * as response from '../../helpers/responseHelper'
import { getRooms, getRoomDetails, createRoom, editRoom, deleteRoom } from '../../repositories/rooms'
import { body, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'


const _getRooms = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page || 1,
      paging = req.query.paging || 16

    const data = await getRooms({ page, paging })

    response.success(res, data)
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

const _getRoomDetails = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const room = await getRoomDetails({ _id: req.params.id })
    if (room)
      response.success(res, room)
    else
      response.error(res, 'Room not found')
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

const _createRoom = [
  body('name').optional(false).isLength({ min: 5 }),
  body('email').optional(false).isEmail(),
  body('website').optional(false).isLength({ min: 5 }),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { name, email, website } = req.body

      const room = await createRoom({
        name,
        email,
        website
      })
      response.success(res, room)
    } catch (err: any) {
      response.error(res, err.toString(), 400)
    }
  }]

const _editRoom = [
  body('name').optional(false).isLength({ min: 5 }),
  body('email').optional(false).isEmail(),
  body('website').optional(false).isLength({ min: 5 }),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { name, email, website } = req.body
      const room = await editRoom({ _id: req.params.id, name, email, website })

      if (room)
        response.success(res, room)
      else
        response.error(res, 'Room not found')

    } catch (err: any) {
      response.error(res, err.toString(), 400)
    }
  }]

const _deleteRoom = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const room = await deleteRoom({ _id: req.params.id })
    if (room)
      response.success(res, room)
    else
      response.error(res, 'Room not found')
  } catch (err: any) {
    response.error(res, err.toString(), 400)
  }
}

export {
  _getRooms as getRooms,
  _getRoomDetails as getRoomDetails,
  _createRoom as createRoom,
  _editRoom as editRoom,
  _deleteRoom as deleteRoom
}