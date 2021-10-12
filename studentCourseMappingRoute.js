const express = require("express");
const router = express.Router();
const Mapping = require("./studentCourseMapping");

router.post("/", (req, res) => {
  const mappingObject = new Mapping(req.body);
  mappingObject.save(err => {
    if (err) throw err;
    res.send(mappingObject);
  });
});

router.get("/", (req, res) => {
  Mapping.find({}, (err, list) => {
    if (err) throw err;
    res.send(list);
  })
    .populate("student")
    .populate("course");
});

module.exports = router;
