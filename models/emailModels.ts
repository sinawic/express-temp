import mongoose from 'mongoose'

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
  sent: { type: Boolean, default: false },
  supporter: { type: mongoose.Schema.Types.ObjectId },
  room: { type: mongoose.Schema.Types.ObjectId }
})
const Email = mongoose.model('email', EmailSchema)



export {
  Attachment, AttachmentSchema, Email, EmailSchema
}