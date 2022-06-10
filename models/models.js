const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
  date_created: { type: Date, default: new Date() },
  name: { type: String, required: true },
  email: { type: String, default: process.env.MAIN_EMAIL },
  website: { type: String, required: true }
})
RoomSchema.index({ name: 1 }, { unique: true })
const Room = mongoose.model('room', RoomSchema)


const SupporterSchema = new mongoose.Schema({
  date_created: { type: Date, default: new Date() },
  username: { type: String, required: true },
  password: String,
  active: { type: Boolean, default: true },
  room: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'room' }
})
SupporterSchema.index({ email: 1 }, { unique: true })
const Supporter = mongoose.model('supporter', SupporterSchema)


const AttachmentSchema = new mongoose.Schema({
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  email: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'email' }
})
const Attachment = mongoose.model('attachment', AttachmentSchema)


const EmailSchema = new mongoose.Schema({
  date_created: { type: Date, default: new Date() },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  sent: { type: Boolean, default: true },
  supporter: { type: mongoose.Schema.Types.ObjectId },
  room: { type: mongoose.Schema.Types.ObjectId }
})
EmailSchema.index({ email: 1 }, { unique: true })
const Email = mongoose.model('email', EmailSchema)



module.exports = {
  Supporter, SupporterSchema, Room, RoomSchema, Attachment, AttachmentSchema, Email, EmailSchema
}