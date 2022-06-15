import express from 'express';
var router = express.Router();

router.use(require("../middlewares/checkAccessToken").basicAuth)

router.use('/rooms', require("../controllers/admin/rooms"))
router.use('/supporters', require("../controllers/admin/supporters"))

export default router;
