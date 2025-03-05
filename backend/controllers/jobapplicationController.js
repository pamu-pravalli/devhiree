

const AppliedJob = require("../models/appliedJob");

const applyJob = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!req.file) return res.status(400).json({ message: "Resume is required!" });
    if (!role) return res.status(400).json({ message: "Role is required!" });

    const appliedJob = new AppliedJob({
      name,
      email,
      resume: req.file.path,
      role,
      status: "pending" 
    });

    await appliedJob.save();
    res.status(201).json({ message: "Job applied successfully!", appliedJob });

  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const getUserAppliedJobs = async (req, res) => {
  try {
    const { email } = req.params;
    const appliedJobs = await AppliedJob.find({ email });

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Server error!" });
  }
};


const getAllAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await AppliedJob.find(); 
    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching all applied jobs:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    
    if (!["pending", "shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedJob = await AppliedJob.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated successfully", updatedJob });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { applyJob, getUserAppliedJobs, getAllAppliedJobs, updateApplicationStatus };


