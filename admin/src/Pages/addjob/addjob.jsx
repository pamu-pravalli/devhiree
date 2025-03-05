import React, { useState } from "react";
import axios from "axios"; 
import "./addjob.css";

export default function AddJobForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:5000/api/admin/jobs/add", {
        title,
        experience,
        qualifications,
        salary,
      });

      if (response.status === 201) {
        alert("Job added successfully!"); 
        onClose(); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add job"); 
    }
  };

  return (
    <div className="job-container">
      <div className="job-box">
        
        <button className="close-icon" onClick={onClose}>✖</button>

        <h2>Add Job</h2>

        
        <form className="job-fields" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            className="job-input"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Experience (e.g., 2 years)"
            className="job-input"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <input
            type="text"
            placeholder="Qualifications"
            className="job-input"
            required
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
          />
          <input
            type="text"
            placeholder="Salary (e.g., ₹50,000/month)"
            className="job-input"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <button type="submit" className="job-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
