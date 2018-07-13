const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const router = require("./Routes/routes");

const app = express();

// Body Parser middleware
app.use(bodyParser.json());

// File-Upload Middleware
app.use(fileUpload());

// API Router middleware
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Started Listening on port 3000!!");
});
