const mongoose = require("./config");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  phone: {
    type: Number,
    required: true,
    default: 0
  },
  designation: {
    type: String,
    required: true,
    default: ""
  },
  department: {
    type: String,
    required: true,
    default: ""
  },
  location: {
    type: String,
    required: true,
    default: ""
  },
  assignable: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model("User", User);
