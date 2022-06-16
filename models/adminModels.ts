import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  date_created: { type: Date, default: new Date() },
  name: { type: String, required: true },
  email: { type: String, default: process.env.SOURCE_EMAIL },
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
const Supporter = mongoose.model('supporter', SupporterSchema)


export {
  Supporter, SupporterSchema, Room, RoomSchema
}