const router = require("express").Router();
const UserModel = require("../Models/User");
const InspectionModel = require("../Models/InspectionModel");
const { Locations } = require("../Constants/Location");

const _ = require("lodash");

// Create a New User
router.post("/user/new", (req, res) => {
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
router.post("/inspection/new", (req, res) => {
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
router.patch("/inspection/:id", (req, res) => {
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
router.get("/inspection/:id", (req, res) => {
  InspectionModel.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

// Get all Locations
router.get("/users/locations", (req, res) => {
  res.status(200).send(Locations);
});

// Get All Departments from Particular Location
router.get("/users/:location/departments", (req, res) => {
  UserModel.find({ location: req.params.location }, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      let listOfDepartments = new Set();
      docs.forEach(doc => {
        listOfDepartments.add(doc.department);
      });
      // console.log(listOfDepartments);
      res.status(200).send(Array.from(listOfDepartments));
    }
  });
});

// Get Designations from particular location and departments
router.get("/users/:location/:department/designations", (req, res) => {
  UserModel.find(
    {
      location: req.params.location,
      department: req.params.department
    },
    (err, docs) => {
      if (err) {
        res.status(400).send(err);
      } else {
        let listofDesignations = new Set();
        docs.forEach(doc => {
          listofDesignations.add(doc.designation);
        });

        res.status(200).send(Array.from(listofDesignations));
      }
    }
  );
});

module.exports = router;
