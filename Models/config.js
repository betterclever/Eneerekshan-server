const mongoose = require("mongoose");

const mongoURL = "mongodb://jigar:qwerty123@ds125241.mlab.com:25241/jigar";

mongoose.Promise = global.Promise;

mongoose
  .connect(
    mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
  });

module.exports = mongoose;
