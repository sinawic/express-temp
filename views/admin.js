const express = require('express')
const router = express.Router()

const RoomService = require('../controllers/admin')

router.get('/', RoomService.getRooms)

router.get('/:id', RoomService.getRoomDetails)

router.post('/', function (req, res, next) {
  res.send('create a room')
})

router.put('/:id', function (req, res, next) {
  res.send('edit a room')
})

module.exports = router