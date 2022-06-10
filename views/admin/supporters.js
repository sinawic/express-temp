const express = require('express')
const router = express.Router()

const Service = require('../../controllers/admin/supporters')

router.get('/', Service.getSupporters)

router.get('/:id', Service.getSupporterDetails)

router.post('/', Service.createSupporter)

router.put('/:id', Service.editSupporter)

router.delete('/:id', Service.deleteSupporter)

module.exports = router