// hw > routes > api > news > like.js

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('localhost:3000/api/news/like');
});

module.exports = router;
