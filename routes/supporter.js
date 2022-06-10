var express = require('express');
var router = express.Router();

router.use('/login', require("../views/supporter/login"))

router.use(require("../middlewares/authorizeSupporterToken"))

router.use('/sendmail', require("../views/supporter/sendMail"))

module.exports = router;
