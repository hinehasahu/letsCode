import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/challenges.css";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [viewUserChallenges, setViewUserChallenges] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || ""); // Store user ID

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    type: "daily",
    target: "",
  });

  // ✅ Set & Save User ID
  const handleSetUserId = () => {
    const id = prompt("Enter your User ID:");
    if (id) {
      setUserId(id);
      localStorage.setItem("userId", id); // Save in local storage
    }
  };

  // ✅ Fetch Challenges
  const fetchChallenges = async (userSpecific = false) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    setViewUserChallenges(userSpecific);

    try {
      const endpoint = userSpecific
        ? `${import.meta.env.VITE_API_BASE_URL}/challenges/user/${userId}`
        : `${import.meta.env.VITE_API_BASE_URL}/challenges`;

      const response = await axios.get(endpoint);
      setChallenges(response.data);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setError("Failed to load challenges. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge({ ...newChallenge, [name]: value });
  };

  // ✅ Create new challenge
  const createChallenge = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/challenges/create`, {
        ...newChallenge,
        target: Number(newChallenge.target),
      });

      setSuccessMessage("Challenge created successfully!");
      setNewChallenge({ title: "", description: "", type: "daily", target: "" });
      fetchChallenges();
    } catch (error) {
      console.error("Error creating challenge:", error);
      setError("Failed to create challenge. Try again.");
    }
  };

  // ✅ Join a challenge
  const joinChallenge = async (challengeId) => {
    if (!userId) {
      handleSetUserId();
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/challenges/join/${challengeId}`, { userId });
      setSuccessMessage("Successfully joined the challenge!");
      fetchChallenges(viewUserChallenges);
    } catch (error) {
      console.error("Error joining challenge:", error);
      setError(error.response?.data?.error || "Failed to join challenge. Try again.");
    }
  };

  // ✅ Complete a challenge
  const completeChallenge = async (challengeId) => {
    if (!userId) {
      handleSetUserId();
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/challenges/complete/${challengeId}/${userId}`);
      setSuccessMessage("Challenge marked as completed!");
      fetchChallenges(viewUserChallenges);
    } catch (error) {
      console.error("Error completing challenge:", error);
      setError("Failed to complete challenge. Try again.");
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="challenges-container">
      <h2>Daily & Weekly Challenges</h2>

      {/* ✅ User ID Section */}
      <div className="user-id-section">
        {userId ? (
          <p><strong>Logged in as:</strong> {userId} <button onClick={() => setUserId("")}>Change</button></p>
        ) : (
          <button onClick={handleSetUserId} className="fetch-button">Set User ID</button>
        )}
      </div>

      {/* ✅ Toggle between All Challenges & My Challenges */}
      <button onClick={() => fetchChallenges(false)} className="fetch-button">
        View All Challenges
      </button>
      <button onClick={() => fetchChallenges(true)} className="fetch-button">
        My Challenges
      </button>

      {/* ✅ Form to Create Challenge */}
      <div className="create-challenge-form">
        <h3>Create New Challenge</h3>
        <form onSubmit={createChallenge}>
          <input
            type="text"
            name="title"
            placeholder="Challenge Title"
            value={newChallenge.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newChallenge.description}
            onChange={handleInputChange}
            required
          />
          <select name="type" value={newChallenge.type} onChange={handleInputChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <input
            type="number"
            name="target"
            placeholder="Target Asanas"
            value={newChallenge.target}
            onChange={handleInputChange}
            min="1"
            required
          />
          <button type="submit" className="create-button">Create Challenge</button>
        </form>
      </div>

      {/* ✅ Show error or success messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* ✅ Display Challenges List */}
      {loading && <p>Loading challenges...</p>}
      {challenges.length > 0 ? (
        <ul className="challenges-list">
          {challenges.map((challenge) => (
            <li key={challenge._id} className="challenge-item">
              <h3>{challenge.title}</h3>
              <p><strong>Type:</strong> {challenge.type}</p>
              <p><strong>Description:</strong> {challenge.description}</p>
              <p><strong>Target Asanas:</strong> {challenge.target}</p>
              <p><strong>Participants:</strong> {challenge.participants.length}</p>

              {/* ✅ Join Challenge Button */}
              {!challenge.participants.some(p => p.userId === userId) && (
                <button onClick={() => joinChallenge(challenge._id)} className="join-button">
                  Join Challenge
                </button>
              )}

              {/* ✅ Complete Challenge Button (Only if joined) */}
              {challenge.participants.some(p => p.userId === userId && !p.completed) && (
                <button onClick={() => completeChallenge(challenge._id)} className="complete-button">
                  Complete Challenge
                </button>
              )}

              {/* ✅ Show if Challenge is Completed */}
              {challenge.participants.some(p => p.userId === userId && p.completed) && (
                <p className="completed-message">✅ Challenge Completed!</p>
              )}
            </li>
          ))}
        </ul>
      ) : <p>No challenges found.</p>}
    </div>
  );
};

export default Challenges;
