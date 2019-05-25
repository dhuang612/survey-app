const passport = require('passport');
//cookie based authentication comes with a header that has a code that will be included with follow-up requests
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

/*
 app.get('/auth/google/callback', passport.authenticate('google'));
This is the same as our controller in the more recent app.
we setup routes inside of our controller to be able to make changes to our data.
*/
