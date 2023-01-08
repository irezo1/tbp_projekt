const baza = require('../public/javascripts/rad_s_bazom');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (req.cookies.user_id)
    res.render('statistika');
  else
    res.redirect('prijava');
});

router.get('/dohvatiZnamenitosti', async function (req, res, next) {
  await baza.dohvatiZnamenitosti().then(
    uspj_dod => {
      if (uspj_dod != -1) {
        res.json(uspj_dod)
      } else {
        res.json("Nije dohvaceno");
      }
    }
  ).catch(err => res.send(err));
});

router.get('/odjava', function (req, res, next) {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    res.redirect('/');
  }
});

router.get('/dohvatiPutovanja', async function (req, res, next) {
  await baza.dohvatiPutovanja(req.cookies.user_id).then(
    uspj_dod => {
      if (uspj_dod != -1) {
        res.json(uspj_dod)
      } else {
        res.json("Nije dodano");
      }
    }
  ).catch(err => res.send(err));
});

module.exports = router;