const express = require('express');
const router = express.Router();

router.use('/:blogIdx/articles', require('./articles'));
router.use('/', require('./blog'));

module.exports = router;
