import express from 'express'
const router = express.Router()

const Service = require('../../services/supporter/login')

router.post('/', Service.login)

export default router