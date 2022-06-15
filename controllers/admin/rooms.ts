import express from 'express'
const router = express.Router()

import * as Service from '../../services/admin/rooms'

router.get('/', Service.getRooms)

router.get('/:id', Service.getRoomDetails)

router.post('/', Service.createRoom)

router.put('/:id', Service.editRoom)

router.delete('/:id', Service.deleteRoom)

export default router