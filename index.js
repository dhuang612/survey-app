const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//creates a new instance of google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token: ', accessToken);
      console.log('profile: ', profile);
      console.log('refresh token: ', refreshToken);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

/*
you use google developers console to gen the application
you then pass in the client ID
use 
http://localhost:5000/auth/google/callback

clientID: 596213864696-87iuiau2g2psnntmuppbu7kk8em03lq8.apps.googleusercontent.com
client secret: AiPzJmNHZZwYqGBm8RRjgKQF
*/

const PORT = process.env.PORT || 5000;
app.listen(PORT);
