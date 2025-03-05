import React, { useState, useEffect } from "react";
import axios from "axios";
import "./joblist.css";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isLoggedIn = localStorage.getItem("adminToken"); // Check login status

  useEffect(() => {
    if (!isLoggedIn) return; // Don't fetch jobs if not logged in

    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        setError("Failed to fetch jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <h2 className="login-message">Please login to view job listings</h2>;
  }

  return (
    <div className="joblist-container">
      <h2>Available Jobs</h2>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Qualifications:</strong> {job.qualifications}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
}
