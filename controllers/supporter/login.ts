import express from 'express'
const router = express.Router()

import * as Service from '../../services/supporter/login'

router.post('/', Service.login)

export default router