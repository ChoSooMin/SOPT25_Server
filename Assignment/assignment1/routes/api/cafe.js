// hw > routes > api > cafe.js

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('localhost:3000/api/cafe');
});

module.exports = router;
