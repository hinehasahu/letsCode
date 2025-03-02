import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the Wellness Community</h1>
      <p>Track your progress and stay motivated!</p>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/challenges")}>Go to Challenges</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* ✅ Go to Login Page */}
            <button onClick={() => navigate("/login")}>Login</button>

            {/* ✅ Go to Register Page */}
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
