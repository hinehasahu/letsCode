import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/"><h2>Wellness App</h2></Link>
      
      <div>
      {/* <Link to="/">Home</Link> */}
      <Link to="/dashboard">Dashboard</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/asanas">Asanas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
