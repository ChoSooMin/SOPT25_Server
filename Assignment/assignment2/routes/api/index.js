const express = require('express');
const router = express.Router();

router.use('/group', require('./group')); // group 경로 설정

module.exports = router;