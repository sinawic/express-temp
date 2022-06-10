const { Supporter, Email, Attachment } = require('./../../models/models')
const response = require('./../../helpers/responseHelper')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const path = require('path')
const multer = require('multer')
const { unlink } = require('fs')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => { // setting destination of uploading files   
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => { // naming file
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

module.exports.sendMail = [
  multer({ storage: fileStorage, limits: { fileSize: '2mb' } })
    .fields([{ name: 'files', maxCount: 10 }]),
  body('to').optional(false).isEmail(),
  body('subject').optional(false).isLength({ min: 5 }),
  body('text').optional(false).isLength({ min: 5 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return response.error(res, errors.array(), 400)

      const { to, subject, text } = req.body
      const files = req.files.files

      const email = new Email({
        to, subject, text,
        date_created: new Date(),
        supporter: req.user._id,
        room: req.user.room
      })
      await email.save()

      files.map(async file => {
        const attachment = new Attachment({
          ...file, email: new mongoose.Types.ObjectId(email._id)
        })
        await attachment.save()
      })

      response.success(res, email)
    } catch (err) {
      req.files && req.files.files.map(async file => {
        const f = await Attachment.deleteOne({ path: file.path })
        unlink(file.path, (err) => {
          if (err) console.log(err)
          console.log('successfully deleted ' + file.path);
        })
      })
      response.error(res, err.toString(), 400)
    }
  }]


