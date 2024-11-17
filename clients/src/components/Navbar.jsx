// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Create this file for custom styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Admin Panel</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/employees">Employee Management</Link>
        </li>
        <li>
                    <button  className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
