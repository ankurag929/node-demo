const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  console.log("In Auth");
  // return next();
  let token = "";
  if (
    req &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.length > 1
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    jwt.verify(token, "THIS_IS_MY_PRIVATE_KEY");
    console.log("VALID");
    next();
  } catch (error) {
    res.send("UNAUTHORIZED_ACCESS");
    return;
  }
};

module.exports = auth;
