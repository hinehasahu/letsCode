import React, { useState } from "react";
import axios from "axios";
import "../styles/asanas.css";

const userId = "USER_ID_HERE"; // TODO: Replace with actual user ID from authentication

const Asanas = () => {
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAsanas, setShowAsanas] = useState(false);
  const [newAsana, setNewAsana] = useState({
    name: "",
    difficulty: "",
    description: "",
    benefits: "",
  });

  // ✅ Fetch all Asanas
  const fetchAsanas = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    setShowAsanas(false);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/asanas`);
      setAsanas(response.data);
      setShowAsanas(true);
    } catch (error) {
      console.error("Error fetching asanas:", error);
      setError("Failed to load asanas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsana({ ...newAsana, [name]: value });
  };

  // ✅ Handle form submission to create a new Asana
  const createAsana = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Convert benefits to an array (split by commas)
    const benefitsArray = newAsana.benefits.split(",").map((b) => b.trim());

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/asanas/create`, {
        ...newAsana,
        benefits: benefitsArray,
      });

      setSuccessMessage("Asana created successfully! 🎉");
      setNewAsana({ name: "", difficulty: "", description: "", benefits: "" }); // Clear form
      fetchAsanas(); // Refresh asanas list
    } catch (error) {
      console.error("Error creating asana:", error);
      setError("Failed to create Asana. Try again.");
    }
  };

  // ✅ Mark Asana as Completed
  const completeAsana = async (asanaId) => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/asanas/complete/${asanaId}/${userId}`);

      setSuccessMessage("Asana completed successfully! 🎉");
      setAsanas((prevAsanas) =>
        prevAsanas.map((asana) =>
          asana._id === asanaId
            ? { ...asana, completedBy: [...asana.completedBy, { userId, date: new Date() }] }
            : asana
        )
      );
    } catch (error) {
      console.error("Error completing asana:", error);
      setError("Failed to complete Asana. Try again.");
    }
  };

  // ✅ Rate Asana
  const rateAsana = async (asanaId, rating) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/asanas/rate/${asanaId}/${rating}`);

      setSuccessMessage("Rating submitted successfully! ⭐");
      setAsanas((prevAsanas) =>
        prevAsanas.map((asana) =>
          asana._id === asanaId
            ? { ...asana, difficulty: (asana.difficulty + Number(rating)) / 2 }
            : asana
        )
      );
    } catch (error) {
      console.error("Error rating asana:", error);
      setError("Failed to rate Asana. Try again.");
    }
  };

  return (
    <div className="asanas-container">
      <h2>Yoga Asanas</h2>

      {/* ✅ Button to Fetch Asanas */}
      <button onClick={fetchAsanas} className="fetch-button">
        Get All Asanas
      </button>

      {/* ✅ Form to Create Asana */}
      <div className="create-asana-form">
        <h3>Create New Asana</h3>
        <form onSubmit={createAsana}>
          <input
            type="text"
            name="name"
            placeholder="Asana Name"
            value={newAsana.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="difficulty"
            placeholder="Difficulty (1-5)"
            value={newAsana.difficulty}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newAsana.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="benefits"
            placeholder="Benefits (comma-separated)"
            value={newAsana.benefits}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="create-button">Create Asana</button>
        </form>
      </div>

      {/* ✅ Show error or success messages */}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* ✅ Display Asanas List */}
      {loading && <p>Loading asanas...</p>}
      {showAsanas && asanas.length > 0 ? (
        <ul className="asanas-list">
          {asanas.map((asana) => (
            <li key={asana._id} className={`asana-item ${asana.completedBy.some((entry) => entry.userId === userId) ? "completed" : ""}`}>
              <h3>{asana.name}</h3>
              <p><strong>Difficulty:</strong> {asana.difficulty.toFixed(2)}/5</p>
              <p><strong>Description:</strong> {asana.description}</p>
              <p><strong>Benefits:</strong></p>
              <ul>
                {asana.benefits.map((benefit, index) => (
                  <li key={index}>✔ {benefit}</li>
                ))}
              </ul>

              {/* ✅ Complete Asana Button */}
              {!asana.completedBy.some((entry) => entry.userId === userId) ? (
                <button onClick={() => completeAsana(asana._id)} className="complete-button">
                  Mark as Completed
                </button>
              ) : (
                <p className="completed-text">✅ Completed</p>
              )}

              {/* ✅ Rate Asana */}
              <div className="rating-container">
                <label>Rate this Asana: </label>
                <select onChange={(e) => rateAsana(asana._id, e.target.value)}>
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} ⭐</option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      ) : showAsanas && <p>No asanas found.</p>}
    </div>
  );
};

export default Asanas;
