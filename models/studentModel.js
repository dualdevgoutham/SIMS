const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("students", studentSchema);
