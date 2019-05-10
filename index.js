const express = require('express');

const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
const app = express();
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
