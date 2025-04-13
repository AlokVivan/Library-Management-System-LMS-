import React from "react";
import { FaHome, FaBook, FaUser, FaPhone } from 'react-icons/fa'; // Import icons

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src="src/assets/logo.png" alt="Bookify Logo" style={styles.logoImage} />
      </div>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <a href="#" style={styles.menuItemAnchor}>
            <FaHome style={styles.icon} /> Home
          </a>
        </li>
        <li style={styles.menuItem}>
          <a href="#" style={styles.menuItemAnchor}>
            <FaBook style={styles.icon} /> Books
          </a>
        </li>
        <li style={styles.menuItem}>
          <a href="#" style={styles.menuItemAnchor}>
            <FaUser style={styles.icon} /> Account
          </a>
        </li>
        <li style={styles.menuItem}>
          <a href="#" style={styles.menuItemAnchor}>
            <FaPhone style={styles.icon} /> Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "white",
    color: "white",
    padding: "1rem 2rem", // Horizontal padding for spacing
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid black", // Bottom border for style
    height:"80px",
  },
  logo: {
    width: "150px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%", // Makes the image scale with the container
    height: "100%", // Makes the image scale with the container
    objectFit: "contain", // Ensures the image maintains its aspect ratio
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginLeft: "2rem", // Space between menu items
    display: "flex",
    alignItems: "center", // Aligns icon and text vertically
  },
  menuItemAnchor: {
    color: "black",
    textDecoration: "none", // Removes underline
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif", // Corrected property name
    fontWeight: 600,
    fontStyle: "normal",
  },
  icon: {
    marginRight: "8px", // Adds space between icon and text
  }
};
