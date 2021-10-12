const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mappingSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: "student"
  },
  course: {
    type: Schema.ObjectId,
    ref: "course"
  }
});

const mappingModel = mongoose.model("mapping", mappingSchema);

module.exports = mappingModel;
