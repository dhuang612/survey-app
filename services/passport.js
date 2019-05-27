const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  /*  
  After they are in our mongoDB we no longer care about the google id
  because each instance inside our db will have a mongoDB id!
  dig more into the npm google oauth20 package and figure out what is going on with internal
  server error
  */
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
/*
look into confirming that proxy is working correctly.
https://github.com/jaredhanson/passport-oauth2/issues/59

*/

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(exisitingUser => {
          if (exisitingUser) {
            //we already have a record for the user use the done function and pass 2 params
            done(null, exisitingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
/*
Because we aren't returning anything in here we can pass the require 
statement as the function

passport google strategy code

  User.findOne({ googleId: profile.id })
        .then(exisitingUser => {
          if (exisitingUser) {
            //we already have a record for the user use the done function and pass 2 params
            done(null, exisitingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
        .catch(err => {
          console.log(err);
        });






*/
