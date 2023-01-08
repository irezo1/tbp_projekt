const autorizacija = require('../public/javascripts/rad_s_bazom');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if (req.cookies.user_id)
  res.redirect('/');
else 
  res.render('registracija');
});

router.post('/',async function(req, res, next){
  await autorizacija.registriraj(req.body.ime,req.body.email_ulaz,req.body.lozinka).then(
      uspj_ulg => {
          if (uspj_ulg>0){
              res.cookie("user_id",uspj_ulg);
              res.redirect('/')
          }else{
              res.send("Nuespjesna registracija");
          }
      }
  ).catch(err => res.send(err));
});

module.exports = router;