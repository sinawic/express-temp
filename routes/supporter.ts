import express from 'express';
var router = express.Router();

router.use('/login', require("../controllers/supporter/login"))

router.use(require("../middlewares/checkAccessToken").jwtAuth)

router.use('/sendmail', require("../controllers/supporter/sendMail"))

export default router;
