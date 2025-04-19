import React, { useState } from "react";
import "../styles/AboutUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api"; // Axios instance

export default function AboutUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/contact", { name, email, message });

      if (res.data.success) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="aboutus-container">
        {/* Team Section */}
        <section className="about-section">
          <h2 className="section-title">
            Meet the <span>Team</span>
          </h2>
          <p className="section-description">
            We’re a driven team on a mission to revolutionize learning through a seamless, modern LMS built for the future of education.
          </p>

          <div className="team-grid">
            <div className="team-card">
              <img src="/src/assets/aaa.jpg" alt="Founder" className="team-img" />
              <h3>Alok Vivan</h3>
              <p className="team-role">Founder</p>
              <p className="team-bio">
                The brain behind the vision — Alok leads the charge in reshaping how students connect with knowledge. With a bold strategy and a love for impactful tech, he’s building the future of learning.
              </p>
            </div>

            <div className="team-card">
              <img src="/src/assets/aaa.jpg" alt="Co-Founder 1" className="team-img" />
              <h3>Ramesh Adii</h3>
              <p className="team-role">Co-Founder</p>
              <p className="team-bio">
                Handles frontend design and user experience. Ramesh ensures that the platform is both beautiful and intuitive for every learner.
              </p>
            </div>

            <div className="team-card">
              <img src="/src/assets/aaa.jpg" alt="Co-Founder 2" className="team-img" />
              <h3>Naman Kr</h3>
              <p className="team-role">Co-Founder</p>
              <p className="team-bio">
                Backend and system architecture expert. Naman powers the engine behind the scenes for speed, security, and scalability.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2 className="section-title">
            Get in <span>Touch</span>
          </h2>
          <p className="section-description">
            Have questions, suggestions, or just want to say hi? We'd love to hear from you!
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
}
