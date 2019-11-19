// hw > routes > index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express localhost:3000' });
});

// localhost:3000/api 설정?
router.use('/api', require('./api'));

module.exports = router;
