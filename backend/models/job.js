const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job||mongoose.model("Job", jobSchema);

module.exports = Job;
