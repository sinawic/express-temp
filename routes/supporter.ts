import express from 'express';
import { jwtAuth } from '../middlewares/checkAccessToken';
import loginRoute from '../controllers/supporter/login';
import sendmailRoute from '../controllers/supporter/sendMail';
var router = express.Router();

router.use('/login', loginRoute)

router.use(jwtAuth)

router.use('/sendmail', sendmailRoute)

export default router;
