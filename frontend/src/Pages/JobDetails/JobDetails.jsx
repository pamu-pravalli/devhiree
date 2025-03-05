import React, { useState, useEffect } from "react";
import JobApplicationForm from "../../Pages/JobApplicationForm/JobApplicationForm";
import axiosInstance from "../../api/axiosInstance";
import "./JobDetails.css";

const JobDetails = () => {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/jobs"); 
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("No Jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="job-details-container">
      <h1>Available Job Roles</h1>
      <input
        type="text"
        placeholder="Search for a job role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="job-list">
        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p className="error">{error}</p> 
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Qualifications:</strong> {job.qualifications}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <button className="apply-btn" onClick={() => setSelectedJob(job)}>Apply Now</button>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>

      
      {selectedJob && <JobApplicationForm job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default JobDetails;
