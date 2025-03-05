import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./JobApplicationForm.css";

const JobApplicationForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", resume: null, role: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("resume", formData.resume);
      data.append("role", formData.role); 
      data.append("jobId", job._id);

      await axiosInstance.post("/applications/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Applied for  ${formData.role} successfully!`);
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Apply for {job.title}</h2>
        <form onSubmit={handleSubmit} className="application-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Frontend Developer">Frontend Devloper</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Quality Analyst">Quality Analyst</option>
            <option value="Software Developer">Software Developer</option>

          </select>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
