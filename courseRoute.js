const express = require("express");
const router = express.Router();
const Course = require("./courseModel");

router.get("/", (req, res) => {
  Course.find({}, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
});

router.post("/", (req, res) => {
  let courseObj = new Course(req.body);
  courseObj.save(err => {
    if (err) throw err;
    res.send(courseObj);
  });
});

module.exports = router;
