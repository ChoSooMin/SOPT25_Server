const express = require('express');
const router = express.Router();

router.use('/api', require('./api')); // api 경로 설정

module.exports = router;