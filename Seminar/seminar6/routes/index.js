var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/api', require('./api'));

module.exports = router;
