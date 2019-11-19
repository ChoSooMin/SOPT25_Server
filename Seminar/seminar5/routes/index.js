const express = require('express');
const router = express.Router();

// multer Test
router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));

module.exports = router;
