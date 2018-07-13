const mongoose = require("./config");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    default: ""
  },
  phone: {
    type: Number,
    default: 0
  },
  designation: {
    type: String,
    default: ""
  },
  department: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  assignable: {
    type: Boolean,
    default: false
  },
  FCMToken: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", User);
