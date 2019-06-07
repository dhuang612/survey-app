//mongoose subdocument
const mongoose = require('mongoose');
const { Schema } = mongoose;
//trying out suggested work around.
const recipientSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    responded: { type: Boolean, default: false }
  }
});

module.exports = recipientSchema;
