var express = require('express');
var router = express.Router();

router.use('/login', require("../views/supporter/login"))

router.use(require("../middlewares/checkAccessToken").jwtAuth)

router.use('/sendmail', require("../views/supporter/sendMail"))

module.exports = router;
