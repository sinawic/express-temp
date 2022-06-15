import mongoose from 'mongoose'
import { Supporter } from '../models/adminModels'
import { sha1 } from '../helpers'
import { ISupporter } from '../types'

const getSupporters = async ({ page, paging }: { page: string, paging: string } | any) => {
  const supporters = await Supporter.aggregate([
    { $sort: { 'date_created': -1 } },
    { $limit: (parseInt(page) - 1) * parseInt(paging) + parseInt(paging) },
    { $skip: (parseInt(page) - 1) * parseInt(paging) }
  ])

  const count = await Supporter.countDocuments({})
  return { data: supporters, count }
}

const getSupporterDetails = async ({ _id }: { _id: string }) => {
  const supporter = await Supporter.findOne({ _id: new mongoose.Types.ObjectId(_id) })
  return supporter
}

const createSupporter = async ({ username, password, room }: { username: string, password: string, room: string }) => {
  const supporter = new Supporter({
    username,
    password: sha1(password),
    room,
    date_created: new Date()
  })

  return await supporter.save()
}

const editSupporter = async ({ _id, username, password }: { username: string, password: string, _id: string }) => {
  return await Supporter.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, {
    username,
    password: sha1(password)
  })
}

const deleteSupporter = async ({ _id }: { _id: string }) => {
  return await Supporter.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) })
}

const getRequesterSupporter = async (user: any) => {
  return await Supporter.findOne({
    _id: new mongoose.Types.ObjectId(user.data._id),
    room: new mongoose.Types.ObjectId(user.data.room), active: true
  })
}

const getSupporterByCred = async ({ username, password, room }: { username: string, password: string, room: string }) => {
  return await Supporter.findOne({
    username, room, password: sha1(password), active: true
  })
}

export {
  getRequesterSupporter, getSupporterByCred,
  getSupporters, getSupporterDetails, createSupporter,
  editSupporter, deleteSupporter
}