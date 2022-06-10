var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource A');
});

router.put('/', function(req, res, next) {
  res.send('respond with a resource A');
});

router.delete('/', function(req, res, next) {
  res.send('respond with a resource A');
});

module.exports = router;
