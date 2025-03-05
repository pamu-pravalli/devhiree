import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; 
import API from "../../api/axiosInstance"; 
import "./Login.css";

const Login = ({ closeForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData); 
      localStorage.setItem("token", res.data.token); 
      login(res.data.user); 
      closeForm?.();
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    }
  };

  return (
    <>
      <div className="blur-background" onClick={closeForm}></div>
      <div className="auth-container">
        <button className="close-btn" onClick={closeForm}>✖</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
