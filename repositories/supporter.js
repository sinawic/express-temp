const mongoose = require('mongoose')
const { Supporter } = require('../models/adminModels')

const getRequesterSupporter = async (user) => {
  return await Supporter.findOne({
    _id: new mongoose.Types.ObjectId(user.data._id),
    room: new mongoose.Types.ObjectId(user.data.room), active: true
  })
}

module.exports = { getRequesterSupporter }