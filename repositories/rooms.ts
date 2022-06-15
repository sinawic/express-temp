import mongoose from 'mongoose'
import { Room } from '../models/adminModels'

const getRooms = async ({ page, paging }: { page: string, paging: string } | any) => {
  const rooms = await Room.aggregate([
    { $sort: { 'date_created': -1 } },
    { $limit: (parseInt(page) - 1) * parseInt(paging) + parseInt(paging) },
    { $skip: (parseInt(page) - 1) * parseInt(paging) }
  ])
  const count = await Room.countDocuments({})
  return { data: rooms, count }
}

const getRoomDetails = async ({ _id }: { _id: string }) => {
  const room = await Room.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  return room
}

const createRoom = async ({ name, email, website }: { name: string, email: string, website: string }) => {
  const room = new Room({
    name,
    email,
    website,
    date_created: new Date()
  })

  return await room.save()
}

const editRoom = async ({ _id, name, email, website }: { _id: string, name: string, email: string, website: string }) => {
  return await Room.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
    name, email, website
  })
}

const deleteRoom = async ({ _id }: { _id: string }) => {
  return await Room.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
}

export { getRooms, getRoomDetails, createRoom, editRoom, deleteRoom }