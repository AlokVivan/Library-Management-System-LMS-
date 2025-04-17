import React, { useState } from "react";
import { FaHome, FaBook, FaUser, FaPhone } from 'react-icons/fa';

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  const menuItems = [
    { label: "Home", icon: <FaHome />, key: "home" },
    { label: "Books", icon: <FaBook />, key: "books" },
    { label: "Account", icon: <FaUser />, key: "account" },
    { label: "Contact", icon: <FaPhone />, key: "contact" },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src="src/assets/logo.png" alt="Bookify Logo" style={styles.logoImage} />
      </div>
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.key}
            style={styles.menuItem}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#"
              style={{
                ...styles.menuItemAnchor,
                transform: hovered === item.key ? "scale(1.15)" : "scale(1)",  // Increased scale value
              }}
            >
              <span style={styles.icon}>{item.icon}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "white",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    //borderBottom: "2px solid black",
    height: "80px",
  },
  logo: {
    width: "150px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginLeft: "2rem",
    display: "flex",
    alignItems: "center",
  },
  menuItemAnchor: {
    color: "black",
    textDecoration: "none",
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    transition: "transform 0.3s", // Only transform transition
    display: "inline-block", // Needed for transform to work nicely
  },
  icon: {
    marginRight: "8px",
  }
};
