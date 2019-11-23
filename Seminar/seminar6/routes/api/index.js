var express = require('express');
var router = express.Router();

router.use('/walk', require('./walk'));
router.use('/ranking', require('./ranking'));

module.exports = router;
