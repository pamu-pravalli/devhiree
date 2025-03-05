import React, { useState } from "react";
import API from "../../api/axiosInstance"; 
import "./Register.css";

const Register = ({ closeForm }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData); 
      alert("Registration Successful! Please log in.");
      closeForm(); 
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <>
      <div className="blur-background" onClick={closeForm}></div>
      <div className="auth-container">
        <button className="close-btn" onClick={closeForm}>✖</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Register;
