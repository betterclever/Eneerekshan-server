const mongoose = require("./config");
const UserSchema = mongoose.model("User").schema;
const Schema = mongoose.Schema;

const InspectionModel = Schema({
  assignees: [UserSchema],
  mediaRef: {
    type: String
  },
  reportID: {
    type: String
  },
  Status: {
    type: String,
    enum: ["seen", "unseen", "compiled", "markedCompiled"]
  },
  submittedBy: UserSchema,
  timeStamp: {
    type: Number
  },
  title: {
    type: String
  },
  urgent: {
    type: Boolean
  }
});

module.exports = mongoose.model("InspectionModel", InspectionModel);
