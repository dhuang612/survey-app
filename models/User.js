const mongoose = require('mongoose');
const { Schema } = mongoose;
/*
const Schema = mongoose.Schema
we need a schema record
json object that describes what a user will look like
*/
//schema constructor
const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
