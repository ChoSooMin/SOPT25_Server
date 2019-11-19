// assignment1 > routes > api > cafe > index.js
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('localhost:3000/api/cafe');
});

module.exports = router;
