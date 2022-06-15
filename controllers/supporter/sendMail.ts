import express from 'express'
const router = express.Router()

const Service = require('../../services/supporter/sendMail')

router.post('/', Service.sendMail)

export default router