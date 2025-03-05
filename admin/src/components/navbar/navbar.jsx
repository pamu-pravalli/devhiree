import React, { useState, useEffect } from "react";
import "./navbar.css";
import Login from "../../Pages/Login/login"; 
import Register from "../../Pages/register/register";
import UpdateStatus from "../../Pages/updatestatus/updatestatus"; 

export default function Navbar({ setShowJobList, setShowAddJob, setShowHome, setShowUpdateStatus }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setShowJobList(false);
    setShowAddJob(false);
    setShowUpdateStatus(false);
    setShowHome(true); 
  };

  const handleAddJobClick = () => {
    if (isLoggedIn) {
      setShowJobList(false);
      setShowUpdateStatus(false);
      setShowAddJob(true);
      setShowHome(true); 
    } else {
      alert("Please login to add a job.");
    }
  };

  const handleJobListClick = () => {
    if (isLoggedIn) {
      setShowAddJob(false);
      setShowUpdateStatus(false);
      setShowJobList(true);
      setShowHome(false); 
    } else {
      alert("Please login to view job listings.");
    }
  };

  const handleUpdateStatusClick = () => {
    if (isLoggedIn) {
      setShowAddJob(false);
      setShowJobList(false);
      setShowUpdateStatus(true);
      setShowHome(false); 
    } else {
      alert("Please login to update application status.");
    }
  };

  const handleHomeClick = () => {
    setShowJobList(false);
    setShowAddJob(false);
    setShowUpdateStatus(false);
    setShowHome(true); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h1>DevHire</h1>
          <ul className="nav-links">
            <li onClick={handleHomeClick}>Home</li>
            <li onClick={handleAddJobClick}>AddJob</li>
            <li onClick={handleJobListClick}>JobList</li>
            <li onClick={handleUpdateStatusClick}>UpdateStatus</li>
          </ul>
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={() => { 
                setShowLogin(true); 
                setShowSignup(false); 
              }}>
                Login
              </button>
              <button className="signup-btn" onClick={() => { 
                setShowSignup(true); 
                setShowLogin(false); 
              }}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {showLogin && (
        <div className="overlay">
          <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />
        </div>
      )}

      {showSignup && (
        <div className="overlay">
          <Register onClose={() => setShowSignup(false)} />
        </div>
      )}
    </>
  );
}
