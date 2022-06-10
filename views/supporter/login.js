const express = require('express')
const router = express.Router()

const Service = require('../../controllers/supporter/login')

router.post('/', Service.login)

module.exports = router