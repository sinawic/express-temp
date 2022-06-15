import express from 'express';
import { basicAuth } from '../middlewares/checkAccessToken';
import roomsRoute from '../controllers/admin/rooms';
import supportersRoute from '../controllers/admin/supporters';

var router = express.Router();

router.use(basicAuth)

router.use('/rooms', roomsRoute)
router.use('/supporters', supportersRoute)

export default router;
