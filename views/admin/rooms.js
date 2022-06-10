const express = require('express')
const router = express.Router()

const RoomService = require('../../controllers/admin/rooms')

router.get('/', RoomService.getRooms)

router.get('/:id', RoomService.getRoomDetails)

router.post('/', RoomService.createRoom)

router.put('/:id', RoomService.editRoom)

router.delete('/:id', RoomService.deleteRoom)

module.exports = router