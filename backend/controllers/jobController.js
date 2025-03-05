const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find(); 
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllJobs };
