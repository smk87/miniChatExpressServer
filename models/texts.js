const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const texts = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("texts", texts);