// hw > routes > api > blog.js

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('localhost:3000/api/blog');
});

module.exports = router;
