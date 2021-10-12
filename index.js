const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const studentRoute = require("./studentRoute");
const courseRoute = require("./courseRoute");
const mappingRoute = require("./studentCourseMappingRoute");
const authRoute = require("./userRoute");
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());
app.use(cors());

function myMiddleware(req, res, next) {
  console.log("In My Middleware");
  next();
}

app.use(myMiddleware); //Add the middleware to the execution workflow
// app.use(authMiddleware); //Add the middleware to the execution workflow

//Routes
//http://localhost:3000/student
app.use("/student", authMiddleware, studentRoute);
//http://localhost:3000/course
app.use("/course", authMiddleware, courseRoute);
//http://locahost:3000/mapping
app.use("/mapping", authMiddleware, mappingRoute);
//http://locahost:3000/auth
app.use("/auth", authRoute);

mongoose
  .connect("mongodb://root:example@localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Hosted on the port 3000");
});
