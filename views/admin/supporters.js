const express = require('express')
const router = express.Router()

const SupporterService = require('../../controllers/admin/supporters')

router.get('/', SupporterService.getSupporters)

router.get('/:id', SupporterService.getSupporterDetails)

router.post('/', SupporterService.createSupporter)

router.put('/:id', SupporterService.editSupporter)

router.delete('/:id', SupporterService.deleteSupporter)

module.exports = router