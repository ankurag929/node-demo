const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: String,
  duration: Number,
  fees: Number
});

const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
