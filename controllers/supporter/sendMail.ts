import express from 'express'
const router = express.Router()

import * as Service from '../../services/supporter/sendMail'

router.post('/', Service.sendMail)

export default router