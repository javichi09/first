var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/author', function (req, res, next) {
  res.render('author', { author: 'Espinoza Aylen' });
})

module.exports = router;