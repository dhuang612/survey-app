const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  Yes: { type: Number, default: 0 },
  No: { type: Number, default: 0 },
  //every survey will belong to a single user who has paid for credits
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});
mongoose.model('surveys', surveySchema);
