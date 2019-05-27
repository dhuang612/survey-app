const express = require('express');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
const http = require('http');
const httpproxy = require('http-proxy');
const proxy = httpproxy.createProxyServer({});
http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: 'http://lit-everglades-64717.herokuapp.com/'
  });
});

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
//user's schema that we need to require mongoose order of operations matter
require('./models/User');
require('./services/passport');
//this can be left as a require statement because it doesn't need to be passed anything.
require('./routes/authRoutes')(app);
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
