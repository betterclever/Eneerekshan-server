const router = require("express").Router();
const mongoose = require("../Models/config");
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

// Get a user using phone Number
router.get("/user/:phone", (req, res) => {
  UserModel.find({ phone: req.params.phone }, (err, docs) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

// Get all Users
router.get("/users", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

// Get User with Particular ID
router.get("/users/:id", (req, res) => {
  UserModel.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

// Create a New Inspection
router.post("/inspection/new", (req, res) => {
  const newInspection = _.pick(req.body, [
    "mediaRef",
    "reportID",
    "submittedBy",
    "title",
    "urgent"
  ]);

  const assignees = req.body.assignees;

  let assigneeList = new Set();
  let arrayOfPromises = assignees.map(async assignee => {
    let res = await UserModel.find({
      location: assignee.location,
      department: assignee.department,
      designation: assignee.designation
    });

    res.map(doc => {
      assigneeList.add(doc._id);
      console.log(doc._id);
    });
  });

  let promiseOfArray = Promise.all(arrayOfPromises);

  promiseOfArray.then(ignored => {
    // res.send(Array.from(assigneeList));
    console.log(Array.from(assigneeList));
    _.assign(newInspection, {
      assignees: Array.from(assigneeList)
    });

    const inspection = new InspectionModel(newInspection);
    inspection
      .save()
      .then(data => {
        return res.status(200).send(data);
      })
      .catch(err => {
        return res.send(err);
      });
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

// Update User FCMToken
router.patch("/users/:id", (req, res) => {
  UserModel.findById(req.params.id, (err, docs) => {
    if (err) {
      res.send(404).send(err);
    } else {
      const newData = _.pick(req.body, ["FCMToken"]);
      docs.set(newData);
      docs
        .save()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
    }
  });
});

// New File
router.post("/files/new", (req, res) => {
  if (!req.files) {
    res.status(400).send("No File Uploaded");
  }

  let file = req.files.file;
  const extension = file.name.split(".")[1];
  file.name = "upload_" + Date.now() + "." + extension;

  if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
    file.mv(__dirname + "/../Uploaded_Files/" + file.name, err => {
      if (err) return res.status(500).send(err);
      res.send(file.name);
    });
  } else {
    res.send("Only Images and Videos Can be Uploaded");
  }
});

// Get Inspections Submitted by Particular Users
router.get("/inspections/submittedBy/:userid", (req, res) => {
  InspectionModel.find(
    {
      submittedBy: {
        _id: req.params.userid
      }
    },
    (err, docs) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(docs);
        res.status(200).send(docs);
      }
    }
  );
});

// Get Inspections assigned to particular Users
router.get("/inspections/markedTo/:userid", (req, res) => {
  InspectionModel.find(
    { assignees: { $in: [req.params.userid] } },
    (err, docs) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(docs);
        res.status(200).send(docs);
      }
    }
  );
});

module.exports = router;
