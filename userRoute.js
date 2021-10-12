const express = require("express");
const router = express.Router();
const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    req.body.password = hash;
    const userObject = new User(req.body);
    userObject.save(err => {
      if (err) throw err;
      res.send({ msg: "SIGNUP SUCCESS" });
    });
  });
});

router.post("/login", (req, res) => {
  User.find({ username: req.body.username }, (err, list) => {
    if (err) throw err;
    if (list && list.length) {
      //Username exists
      const userObject = list[0];
      bcrypt.compare(req.body.password, userObject.password).then(result => {
        if (result) {
          //Generate token
          const payload = {
            id: userObject._id,
            username: userObject.username
          };
          const token = jwt.sign(payload, "THIS_IS_MY_PRIVATE_KEY");
          console.log(token);
          res.send({ token: token });
        } else {
          res.send({ msg: "INVALID_CREDENTIALS" });
        }
      });
    } else {
      //User does not Exists
      res.send({ msg: "User does not Exists" });
    }
  });
});

module.exports = router;
