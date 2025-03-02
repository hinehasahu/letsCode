import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // Ensure you create this CSS file

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to the Wellness Community App</h1>
        <p>Your journey to a healthier and balanced life starts here!</p>
        <Link to="/challenges" className="cta-button">Join a Challenge</Link>
      </header>

      <section className="features-section">
        <h2>Why Join Our Community?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🏆 Gamified Wellness</h3>
            <p>Engage in daily & weekly wellness challenges and earn achievement badges.</p>
          </div>

          <div className="feature-card">
            <h3>🧘‍♂️ Yogasana Tracking</h3>
            <p>Track your yoga practices, rate difficulty levels, and stay consistent.</p>
          </div>

          <div className="feature-card">
            <h3>🤝 Social Groups</h3>
            <p>Join groups, share progress, and stay motivated with community support.</p>
          </div>

          <div className="feature-card">
            <h3>🔔 Notifications</h3>
            <p>Get reminders for new challenges, streak updates, and group milestones.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Create an Account:</strong> Set up your profile and join a wellness group.</li>
          <li><strong>Join Challenges:</strong> Take part in daily & weekly challenges.</li>
          <li><strong>Track Progress:</strong> Log your asanas, track streaks, and earn rewards.</li>
          <li><strong>Stay Motivated:</strong> Connect with others, celebrate milestones, and improve your well-being.</li>
        </ol>
      </section>

      <footer className="footer">
        <p>Ready to transform your wellness journey? <Link to="/challenges">Start now!</Link></p>
      </footer>
    </div>
  );
};

export default Home;
