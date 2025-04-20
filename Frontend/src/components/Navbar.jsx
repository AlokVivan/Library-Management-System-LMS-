import React, { useState } from "react"; 
import { FaHome, FaUser, FaInfoCircle } from "react-icons/fa"; // changed icon

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  const menuItems = [
    { label: "Home", icon: <FaHome />, key: "home", href: "/" },
    { label: "Account", icon: <FaUser />, key: "account", href: "/login" },
    { label: "About", icon: <FaInfoCircle />, key: "about", href: "/about-us" }, // ✅ Updated here
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src="logo.png" alt="Bookify Logo" style={styles.logoImage} />
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
              href={item.href}
              style={{
                ...styles.menuItemAnchor,
                transform: hovered === item.key ? "scale(1.15)" : "scale(1)",
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
    transition: "transform 0.3s",
    display: "inline-block",
  },
  icon: {
    marginRight: "8px",
  },
};
