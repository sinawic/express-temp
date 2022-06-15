import mongoose from "mongoose"

export interface ISupporter {
  date_created: Date,
  username: String,
  password: String,
  active: Boolean,
  room: mongoose.Schema.Types.ObjectId
}

export interface IRoom {
  date_created: Date,
  name: String,
  email: String,
  website: String
}

export interface IAttachment {
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  email: mongoose.Schema.Types.ObjectId
}

export interface IEmail {
  _id: string,
  date_created: Date,
  to: String,
  subject: String,
  text: String,
  sent: Boolean,
  supporter: mongoose.Schema.Types.ObjectId,
  room: mongoose.Schema.Types.ObjectId
}