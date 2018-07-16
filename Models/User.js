const mongoose = require("./config");
const monoogsePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    default: "",
    trim: true
  },
  phone: {
    type: Number,
    default: 0
  },
  designation: {
    type: String,
    default: "",
    trim: true
  },
  department: {
    type: String,
    default: "",
    trim: true
  },
  location: {
    type: String,
    default: "",
    trim: true
  },
  assignable: {
    type: Boolean,
    default: false
  },
  FCMToken: {
    type: String,
    default: "",
    trim: true
  }
});

User.plugin(monoogsePaginate);

module.exports = mongoose.model("User", User);
