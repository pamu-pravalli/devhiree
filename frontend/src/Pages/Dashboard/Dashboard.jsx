import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import "./Dashboard.css";
const BACKEND_URL = 'http://localhost:5000'
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (!user?.email) return;

        const response = await axiosInstance.get(`/applications/user/${user.email}`, {
          headers: { Authorization: `Bearer ${user?.token}` }, 
          
        });

        setAppliedJobs(response.data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name} 👋</h1>
      <p>Email: {user?.email}</p>

      <h2>Your Applied Jobs</h2>
      <div className="applied-jobs">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.role}</h3>
              <p>
                <strong>Resume:</strong>
                <a href={`${BACKEND_URL}/${job.resume}`} target="_blank" rel="noopener noreferrer">
  View Resume
</a>

              </p>
              <p>
                <strong>Applied At:</strong> {new Date(job.appliedAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {job.status || "Pending"}
              </p>
            </div>
          ))
        ) : (
          <p>No jobs applied yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
