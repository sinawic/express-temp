const mongoose = require('mongoose')
const { Email, Attachment } = require('../models/emailModels')

const createEmail = async ({ to, subject, text, supporter, room }) => {
  const email = new Email({
    to, subject, text,
    date_created: new Date(),
    supporter,
    room
  })
  return await email.save()
}

const createAttachment = async ({ file, email }) => {
  const attachment = new Attachment({
    ...file, email: new mongoose.Types.ObjectId(email._id)
  })
  return await attachment.save()
}

const deleteAttachment = async ({ path }) => {
  return await Attachment.deleteOne({ path })
}

module.exports = { createEmail, createAttachment, deleteAttachment }