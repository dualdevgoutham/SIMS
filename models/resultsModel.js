const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    examDate: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("results", resultSchema);
