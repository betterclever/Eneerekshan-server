const router = require("express").Router();
const UserModel = require("../Models/User");
const InspectionModel = require("../Models/InspectionModel");
const _ = require("lodash");

// Create a New User
router.post("/createUser", (req, res) => {
  const newUser = _.pick(req.body, [
    "name",
    "phone",
    "designation",
    "department",
    "location",
    "assignable"
  ]);

  const user = new UserModel(newUser);
  user
    .save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

// Create a New Inspection
router.post("/inspections/new", (req, res) => {
  const newInspection = _.pick(req.body, [
    "assignees",
    "mediaRef",
    "reportID",
    "Status",
    "submittedBy",
    "timeStamp",
    "title",
    "urgent"
  ]);

  const inspection = new InspectionModel(newInspection);
  inspection
    .save()
    .then(data => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

// Patch an Inspection
router.patch("/inspections/:id", (req, res) => {
  InspectionModel.findById(req.params.id, (err, inspection) => {
    if (err) {
      res.status(404).send(err);
    } else {
      const updatedInspection = _.pick(req.body, [
        "assignees",
        "mediaRef",
        "reportID",
        "Status",
        "submittedBy",
        "timeStamp",
        "title",
        "urgent"
      ]);

      inspection.set(updatedInspection);
      inspection
        .save()
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(404).send(err);
        });
    }
  });
});

// Get an Inspections
router.get("/inspections/:id", (req, res) => {
  InspectionModel.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

module.exports = router;
