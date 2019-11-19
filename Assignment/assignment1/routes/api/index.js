// hw > routes > api > index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express /api' });
});

router.use('/cafe', require('./cafe')); // localhost:3000/api/cafe 설정
router.use('/blog', require('./blog')); // localhost:3000/api/blog 설정
router.use('/news', require('./news')); // localhost:3000/api/news 설정

module.exports = router;