var express = require('express');
var router = express.Router();

router.use(require("../../middlewares/checkAccessToken"))

router.use('/rooms', require("../../views/admin"))

module.exports = router;
