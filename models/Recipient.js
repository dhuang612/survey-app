//mongoose subdocument
const mongoose = require('mongoose');
const { Schema } = mongoose;
//trying out suggested work around.
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
