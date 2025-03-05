import React, { useState, useEffect } from "react";
import axios from "axios";
import "./updatestatus.css"; 

export default function UpdateStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/appliedjobs");
        setApplications(response.data);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/appliedjobs/update/${id}`, { status: newStatus });

      
      setApplications(applications.map(app => app._id === id ? { ...app, status: newStatus } : app));
      
      alert("Status updated successfully!");
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="status-container">
      <h2>Update Application Status</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <table className="status-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Applied At</th>
              <th>Job Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>
                  <a href={`http://localhost:5000/${app.resume}`} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>{app.role}</td>
                <td>
                  <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
