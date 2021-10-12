const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: String,
  age: Number,
  mobile: String
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
