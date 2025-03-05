import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Find Your Dream Developer Job</h1>
        <p className="para">Join top tech companies and grow your career.</p>
        <button className="explore-btn">Explore Jobs</button>
      </div>
      <div className="header-image">
        <img src='https://tms-outsource.com/blog/wp-content/uploads/2021/03/software-heder.jpg' alt="Job Search" />
      </div>
    </header>
  );
};

export default Header;

