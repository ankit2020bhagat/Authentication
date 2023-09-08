import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
