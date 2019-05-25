const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  /*  
  After they are in our mongoDB we no longer care about the google id
  because each instance inside our db will have a mongoDB id!
  */
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, cb, done) => {
      User.findOne({ googleId: profile.id })
        .then(exisitingUser => {
          if (exisitingUser) {
            //we already have a record for the user use the done function and pass 2 params
            done(null, exisitingUser, cb);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user, cb));
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
