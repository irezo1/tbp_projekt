const baza = require('../public/javascripts/rad_s_bazom');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (req.cookies.user_id)
    res.render('putovanja');
  else
    res.redirect('prijava');
});

router.get('/dodaj_putovanje', async function (req, res, next) {
  await baza.dodajPutovanje(req.query.lat, req.query.lng, req.cookies.user_id, req.query.datum).then(
    uspj_dod => {
      if (uspj_dod > 0) {
        res.json("Dodano")
      } else {
        res.json("Nije dodano");
      }
    }
  ).catch(err => res.send(err));
});

router.get('/dodaj_znamenitost', async function (req, res, next) {
  await baza.dodajZnamenitost(req.query.lat, req.query.lng, req.cookies.user_id, req.query.drzava, req.query.naziv).then(
    uspj_dod => {
      res.json(uspj_dod);
    }
  ).catch(err => res.send(err));
});

router.get('/odjava', function (req, res, next) {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    res.redirect('/');
  }
});

router.get('/dohvatiDrzave', async function (req, res, next) {
  await baza.dohvatiDrzave().then(
    uspj_dod => {
      res.json(uspj_dod)
    }
  ).catch(err => res.send(err));
});

module.exports = router;