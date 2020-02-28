var express = require('express');
var router = express.Router();

const dataFile = require('../data/data.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(dataFile.users);
});

module.exports = router;
