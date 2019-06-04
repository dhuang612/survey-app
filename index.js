const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

const app = express();
//allows us to view post req.body object
app.use(bodyParser.json()); //our mongodb requires json
//express middleware wire up here!!!!!!! <LOOK THIS UP>
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

//requiring in the routes we set
//this can be left as a require statement because it doesn't need to be passed anything.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
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
