import React, { useState } from "react";
import axios from "axios"; 
import "./login.css";

export default function Login({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", { email, password });

      if (response.status === 200) {
        const { token, admin } = response.data;
        

        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminEmail", admin.email);

        onLogin(); 
        onClose(); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <button className="close-icon" onClick={onClose}>✖</button>

        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

      
        <form className="login-fields" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit">Login</button>
        </form>
      </div>
    </div>
  );
}
