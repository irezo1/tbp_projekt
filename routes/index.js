var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.cookies.user_id)
    res.render('index', { title: 'Express' });
  else
    res.redirect('prijava');
});

router.get('/odjava', function (req, res, next) {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    res.redirect('/');
  }
});
module.exports = router;
