import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>DevHire</h2>
          <p>Find your dream job and grow your career with top tech companies.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/job-details">Job Listings</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@devhire.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Visakhapatnam, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DevHire. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
