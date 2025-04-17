import React from "react";
import "../styles/HomePage.css";

const HeroSection = () => (
  <div className="hero-bg">
    <div className="hero-overlay">
      <div className="hero-content">
        <h1 className="hero-heading">Read. Learn. Grow.</h1>
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
    <div className="card-grid">
      <div className="info-card"><h3>🚀 Easy Access</h3><p>Access thousands of books, anywhere anytime.</p></div>
      <div className="info-card"><h3>🧠 Interactive Learning</h3><p>Engaging tools to make learning fun and effective.</p></div>
      <div className="info-card"><h3>📊 Track Progress</h3><p>Monitor your journey and stay on top of goals.</p></div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="section-container features-section">
    <h2 className="section-title">Key <span>Features</span></h2>
    <div className="card-grid">
      <div className="info-card"><h3>🔍 Search Books</h3><p>Find and reserve your next read in seconds.</p></div>
      <div className="info-card"><h3>🗓️ Due Reminders</h3><p>Never miss a return date with timely alerts.</p></div>
      <div className="info-card"><h3>📈 Reading History</h3><p>Review your progress and favorite reads.</p></div>
      <div className="info-card"><h3>👥 Reviews</h3><p>Rate and review books for other learners.</p></div>
    </div>
  </section>
);

const NewsletterSection = () => (
  <section className="section-container newsletter-section">
    <h2 className="section-title">Stay <span>Updated</span></h2>
    <p>Subscribe and never miss new releases or updates!</p>
    <div className="newsletter-form">
      <input type="email" placeholder="Enter your email" />
      <button>Subscribe</button>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="section-container contact-section">
    <h2 className="section-title">Get <span>In Touch</span></h2>
    <p>We're happy to help! Drop us a message anytime.</p>
    <div className="contact-info">
      <p>📧 hello@mylms.com</p>
      <p>📞 +91 12345 67890</p>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="homepage-wrapper">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <NewsletterSection />
      <ContactSection />
    </div>
  );
}
