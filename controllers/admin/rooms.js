const express = require('express')
const router = express.Router()

const Service = require('../../services/admin/rooms')

router.get('/', Service.getRooms)

router.get('/:id', Service.getRoomDetails)

router.post('/', Service.createRoom)

router.put('/:id', Service.editRoom)

router.delete('/:id', Service.deleteRoom)

module.exports = router