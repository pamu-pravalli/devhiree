import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate(); 

  const handleJobDetailsClick = (e) => {
    e.preventDefault(); 
    if (user) {
      navigate("/job-details"); 
    } else {
      setShowLogin(true); 
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">DevHire</Link>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link to="/" className="nav-item">Home</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="nav-item">Dashboard</Link>

                <Link to="#" className="nav-item" onClick={handleJobDetailsClick}>
                  Job Details
                </Link>

                <button onClick={logout} className="btn logout">Logout</button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-login" 
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <button 
                  className="btn btn-register" 
                  onClick={() => setShowRegister(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {showLogin && <Login closeForm={() => setShowLogin(false)} />}
      {showRegister && <Register closeForm={() => setShowRegister(false)} />}
    </>
  );
};

export default Navbar;
