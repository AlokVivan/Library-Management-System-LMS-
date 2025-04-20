import React from "react";
import "../styles/HomePage.css";

const HeroSection = () => (
  <div className="hero-bg">
    <div className="hero-overlay">
      <div className="hero-content">
        <h1 className="hero-heading">Book it. Track it. Love it.</h1>
        <p className="hero-subheading">
          Welcome to the future of learning — where your journey to knowledge begins.
        </p>
      </div>
    </div>
  </div>
);

const AboutSection = () => (
  <section className="section-container about-section">
    <h2 className="section-title">About <span>MyLMS</span></h2>
    <p className="section-description">
      MyLMS is your personalized digital library and learning companion. Whether you're a student, educator,
      or lifelong learner, we simplify access to knowledge and help you track your learning journey.
    </p>
    <div className="card-grid elegant-grid">
      <div className="info-card shadow-card">
        <h3>🚀 Easy Access</h3>
        <p>Access thousands of books anytime, anywhere with a seamless digital interface.</p>
      </div>
      <div className="info-card shadow-card">
        <h3>🧠 Interactive Learning</h3>
        <p>Engage with tools that make reading and learning fun, personalized, and effective.</p>
      </div>
      <div className="info-card shadow-card">
        <h3>📊 Track Progress</h3>
        <p>Visualize your growth with insights on reading habits and performance.</p>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="section-container features-section">
    <h2 className="section-title">Key <span>Features</span></h2>
    <div className="card-grid elegant-grid">
      <div className="info-card shadow-card">
        <h3>🔍 Search Books</h3>
        <p>Quickly find the exact book you need with powerful search filters.</p>
      </div>
      <div className="info-card shadow-card">
        <h3>🗓️ Due Reminders</h3>
        <p>Get smart reminders so you never miss a return deadline again.</p>
      </div>
      <div className="info-card shadow-card">
        <h3>📈 Reading History</h3>
        <p>View your entire journey and track favorites with ease.</p>
      </div>
      {/* <div className="info-card shadow-card">
        <h3>👥 Reviews</h3>
        <p>Read, share, and discover book experiences from other learners.</p>
      </div> */}
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="homepage-wrapper">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </div>
  );
}
