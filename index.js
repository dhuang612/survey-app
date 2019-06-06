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

//logic for handling react router routes once we are in prod
if (process.env.NODE_ENV === 'production') {
  //is epxress looking for a specific file check here
  app.use(express.static(path.join(__dirname, 'client/build')));

  //express will server up index.html
  //if express doesn't recognize the route here is the catchall location for anything else
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
