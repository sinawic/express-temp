import * as response from './../../helpers/responseHelper'
import { removeFile } from './../../helpers'
import { createEmail, createAttachment, deleteAttachment } from './../../repositories/email'
import { body, validationResult } from 'express-validator'
import path from 'path'
import multer from 'multer'
import { NextFunction, Request, Response } from 'express'
import { IAttachment } from '../../types'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => { // setting destination of uploading files   
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => { // naming file
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

export const sendMail = [
  multer({ storage: fileStorage })
    .fields([{ name: 'files', maxCount: 10 }]),
  body('to').optional(false).isEmail(),
  body('subject').optional(false).isLength({ min: 5 }),
  body('text').optional(false).isLength({ min: 5 }),
  async function (req: Request | any, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { to, subject, text } = req.body
      const files = req.files.files

      const email = await createEmail({
        to, subject, text, supporter: req.user._id, room: req.user.room.toString()
      })

      files && files.map(async (file: IAttachment) => {
        await createAttachment({ file, email })
      })

      response.success(res, email)
    } catch (err: any) {
      req.files && req.files.files && req.files.files.map(async (file: IAttachment) => {
        await deleteAttachment({ path: file.path })
        removeFile(file.path)
      })
      response.error(res, err.toString(), 400)
    }
  }]



