var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const dataFile = require('../data/data.json')
  res.json(dataFile.posts);
});

router.post('/', function(req, res, next) {

  // this is a good place for validation and data storage
  // for the purpose of this challenge, we can just return the post data
  res.json({
    success: true,
    received: req.body,
    note: 'this is where we would put the data somewhere instead of just parroting it back.'
  });
  //res.json({'success':true})

});

module.exports = router;
