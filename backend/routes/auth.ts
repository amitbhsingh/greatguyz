import GoogleStrategy from 'passport-google-oidc'
import passport from 'passport';
import express from 'express'
import db from '../config/database'

const router =express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

module.exports = router;