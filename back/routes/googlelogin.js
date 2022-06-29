import { Router } from "express";
var googleloginRouter  = Router();
var passport = require('../config/passport.js');

googleloginRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
);

googleloginRouter.get('/google/callback',
  passport.authenticate('google'), authSuccess
);

function authSuccess(req, res) {
  res.redirect('/');
}

export { googleloginRouter };