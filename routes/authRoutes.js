const passport = require('passport');
//cookie based authentication comes with a header that has a code that will be included with follow-up requests
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  //if there are errors related to logging in capture them.
  app.get(
    '/auth/google/callback',
    //middleware
    passport.authenticate('google'),
    //after we successfully log in we add in a redirect to get to the right place
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //this will allow us to confirm if the user is signed in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

/*
 app.get('/auth/google/callback', passport.authenticate('google'));
This is the same as our controller in the more recent app.
we setup routes inside of our controller to be able to make changes to our data.
*/
