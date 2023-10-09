const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
router.get('/author', (req, res) => {
  res.render('author', {
    author: 'Espinoza Aylen',
  });
});
module.exports = router;
