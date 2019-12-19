var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/boards', require('./boards'));
router.use('/dbTest', require('./dbTest'));

module.exports = router;
