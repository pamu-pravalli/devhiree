import React from "react";
import "./register.css";

export default function Register({ onClose }) {
  return (
    <div className="login-container">
      <div className="login-box">
        
        <button className="close-icon" onClick={onClose}>✖</button>

        <h2>Sign Up</h2>

        
        <form className="login-fields">
          <input type="email" placeholder="Email" className="login-input" required />
          <input type="password" placeholder="Password" className="login-input" required />
          <button type="submit" className="login-submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
