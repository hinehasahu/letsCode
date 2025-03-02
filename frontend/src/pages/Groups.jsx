import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/groups.css"; // Ensure this file exists in `src/styles/`

const Groups = () => {
  const [groups, setGroups] = useState([]); // Store all groups
  const [newGroupName, setNewGroupName] = useState(""); // Input for new group
  const [userId, setUserId] = useState(""); // User ID input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // ✅ Fetch all groups when the page loads
  useEffect(() => {
    fetchGroups();
  }, []);

  // ✅ Function to fetch groups
  const fetchGroups = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/api/groups"); // Fetch all groups
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to load groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to create a new group
  const createGroup = async () => {
    if (!newGroupName.trim()) {
      setError("Group name cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/groups/create", { name: newGroupName });

      alert("Group created successfully!");
      setNewGroupName(""); // Clear input field
      fetchGroups(); // Refresh the list
    } catch (err) {
      console.error("Error creating group:", err);
      setError("Failed to create group. Try again.");
    }
  };

  // ✅ Function to join a group
  const joinGroup = async (groupId) => {
    if (!userId.trim()) {
      setError("User ID is required to join a group.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/groups/join/${groupId}`, { userId });

      alert("Joined group successfully!");
      fetchGroups(); // Refresh the list to update members count
    } catch (err) {
      console.error("Error joining group:", err);
      setError("Failed to join group. Try again.");
    }
  };

  // ✅ Function to update group progress (increment totalAsanasCompleted)
  const updateGroupProgress = async (groupId) => {
    if (!userId.trim()) {
      setError("User ID is required to update progress.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/groups/progress/${groupId}/${userId}`);

      alert("Group progress updated!");
      fetchGroups(); // Refresh the list to update the completed Asanas count
    } catch (err) {
      console.error("Error updating progress:", err);
      setError("Failed to update group progress. Try again.");
    }
  };

  return (
    <div className="groups-container">
      <h1>Groups</h1>

      {/* ✅ Create Group Section */}
      <div className="create-group">
        <input
          type="text"
          placeholder="Enter group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <button onClick={createGroup}>Create Group</button>
      </div>

      {/* ✅ User ID Input for Joining and Updating Progress */}
      <div className="user-id-section">
        <input
          type="text"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* ✅ Display Groups */}
      {loading ? (
        <p>Loading groups...</p>
      ) : groups.length > 0 ? (
        <ul className="groups-list">
          {groups.map((group) => (
            <li key={group._id} className="group-item">
              <h3>{group.name}</h3>
              <p><strong>Total Asanas Completed:</strong> {group.totalAsanasCompleted}</p>
              <p><strong>Members:</strong> {group.members.length}</p>
              <button onClick={() => joinGroup(group._id)}>Join Group</button>
              <button onClick={() => updateGroupProgress(group._id)}>Update Progress</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups found.</p>
      )}
    </div>
  );
};

export default Groups;
