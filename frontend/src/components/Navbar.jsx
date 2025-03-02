import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Ensure the CSS file is linked

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">
        <h2>Wellness App</h2>
      </Link>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/asanas">Asanas</Link>
      </div>

      {/* Show User Name & ID if Logged In */}
      {user && (
        <div className="user-info">
          <p>👤 {user.name} </p>
          {/* (ID: {user._id} )*/}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
