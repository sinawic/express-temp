import mongoose from 'mongoose'
import { Email, Attachment } from '../models/emailModels'
import { ISupporter, IEmail, IAttachment, IRoom } from '../types'

const createEmail = async ({ to, subject, text, supporter, room }: {
  to: string,
  subject: string,
  text: string,
  supporter: ISupporter,
  room: IRoom
}) => {
  const email = new Email({
    to, subject, text,
    date_created: new Date(),
    supporter,
    room
  })
  return await email.save()
}

const createAttachment = async ({ file, email }: { file: IAttachment, email: IEmail }) => {
  const attachment = new Attachment({
    ...file, email: new mongoose.Types.ObjectId(email._id)
  })
  return await attachment.save()
}

const deleteAttachment = async ({ path }: { path: String }) => {
  return await Attachment.deleteOne({ path })
}

export { createEmail, createAttachment, deleteAttachment }