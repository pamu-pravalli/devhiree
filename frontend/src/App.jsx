import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header"; 
import JobDetails from "./Pages/JobDetails/JobDetails";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import "./App.css";


const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname === "/"; 
  const showFooter=location.pathname  ==="/";

  return (
    <div className="app-container">
      <Navbar />
      {showHeader && <Header />} 
      {showFooter && <Footer />}
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/job-details" element={<ProtectedRoute element={<JobDetails />} />} />
      </Routes>
    </div>
  );
};


const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout /> 
      </Router>
    </AuthProvider>
  );
}

export default App;
