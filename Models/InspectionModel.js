const mongoose = require("./config");
// const AssigneeSchema = mongoose.model("AssigneeModel").schema;
const Schema = mongoose.Schema;

const InspectionModel = Schema({
  assignees: [Schema.Types.ObjectId],
  mediaRef: {
    type: String
  },
  reportID: {
    type: String
  },
  Status: {
    type: String,
    enum: ["seen", "unseen", "compiled", "markedCompiled"],
    default: "unseen"
  },
  submittedBy: Schema.Types.ObjectId,
  timeStamp: {
    type: Number,
    default: new Date().valueOf()
  },
  title: {
    type: String
  },
  urgent: {
    type: Boolean
  }
});

module.exports = mongoose.model("InspectionModel", InspectionModel);
