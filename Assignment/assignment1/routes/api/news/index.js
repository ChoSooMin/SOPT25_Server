// hw > routes > api > news > index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express /api/news' });
});

router.use('/like', require('./like')); // localhost:3000/api/news/like 설정

module.exports = router;