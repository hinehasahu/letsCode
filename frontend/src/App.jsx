import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";       // ✅ Import Login Page
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Asanas from "./pages/Asanas";
import Groups from "./pages/Groups";
import Challenges from "./pages/Challenges"; // ✅ Fixed import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Add Login Route */}
        <Route path="/register" element={<Register />} />  {/* ✅ Fixed */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/asanas" element={<Asanas />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </Router>
  );
}

export default App;
