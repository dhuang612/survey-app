const mongoose = require('mongoose');
const { Schema } = mongoose;
/*
const Schema = mongoose.Schema
we need a schema record
json object that describes what a user will look like
*/
//schema constructor
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});
//when we generate this new schema we automatically get a .id generated
mongoose.model('users', userSchema);
/*
We are then using this .id as a reference point to reference some specific user

*/
