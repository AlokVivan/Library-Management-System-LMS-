import React from "react";
import "../styles/Hero.css"; // Make sure to create the Hero.css file

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Library</h1>
        <p>Discover a world of knowledge, right at your fingertips.</p>
        <button className="cta-button">Browse Books</button>
      </div>
    </section>
  );
}
