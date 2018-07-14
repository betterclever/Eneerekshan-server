const mongoose = require("./config");
const Schema = mongoose.Schema;

const AssigneeModel = new Schema({
  location: String,
  department: String,
  designation: String
});

module.exports = mongoose.model("AssigneeModel", AssigneeModel);
