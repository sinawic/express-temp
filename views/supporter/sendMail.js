const express = require('express')
const router = express.Router()

const Service = require('../../controllers/supporter/sendMail')

router.post('/', Service.sendMail)

module.exports = router