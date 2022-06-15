import express from 'express'
const router = express.Router()

import * as Service from '../../services/admin/supporters'

router.get('/', Service.getSupporters)

router.get('/:id', Service.getSupporterDetails)

router.post('/', Service.createSupporter)

router.put('/:id', Service.editSupporter)

router.delete('/:id', Service.deleteSupporter)

export default router