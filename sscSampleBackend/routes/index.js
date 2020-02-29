var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session/:userKey', function(req, res, next) {
  console.log(req.body);
  console.log(req.query);
  return res.send("Success");
})

module.exports = router;
