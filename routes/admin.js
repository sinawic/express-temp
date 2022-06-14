var express = require('express');
var router = express.Router();

router.use(require("../middlewares/checkAccessToken").basicAuth)

router.use('/rooms', require("../views/admin/rooms"))
router.use('/supporters', require("../views/admin/supporters"))

module.exports = router;
