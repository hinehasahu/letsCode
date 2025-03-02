import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; // Import CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-card">
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
          {/* <p>ID: {user._id || "Not available"}</p> */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      {/* Back to Home Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default Profile;
