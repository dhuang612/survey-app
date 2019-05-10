const passport = require('passport');
//cookie based authentication comes with a header that has a code that will be included with follow-up requests
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
