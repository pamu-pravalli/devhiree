const Job = require("../models/job"); 


exports.adminAddJob = async (req, res) => {
  try {
    const { title, experience, qualifications, salary } = req.body;

    if (!title || !experience || !qualifications || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({ title, experience, qualifications, salary });
    await newJob.save();

    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (err) {
    console.error("Error in adminAddJob:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
