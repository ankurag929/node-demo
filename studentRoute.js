const express = require("express");
const router = express.Router();
const Student = require("./studentModel");

//Find All by Query
router.get("/", (req, res) => {
  Student.find(req.query, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
});

//Find record by ID
router.get("/:id", (req, res) => {
  Student.find({ _id: req.params.id }, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
});

//Add a new Record
router.post("/", (req, res) => {
  let studentObj = new Student(req.body);
  studentObj.save(err => {
    if (err) throw err;
    res.send(studentObj);
  });
});

router.put("/:id", (req, res) => {
  const name = req.body.name;
  Student.find({ _id: req.params.id }, (err, list) => {
    if (err) throw err;
    if (list && list.length) {
      let obj = list[0];
      obj.name = name;
      obj.save(err => {
        if (err) throw err;
        res.send(obj);
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  Student.remove({ _id: req.params.id }, err => {
    if (err) throw err;
    res.send({ msg: "Success" });
  });
});

module.exports = router;
