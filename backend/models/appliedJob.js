const mongoose = require("mongoose");

const AppliedJobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true }, 
  appliedAt: { type: Date, default: Date.now },
  role: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'rejected', 'shortlisted'], 
    default: 'pending' 
  }
});

module.exports = mongoose.model("AppliedJob", AppliedJobSchema);
