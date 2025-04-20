// components/LogoSpinner.jsx
import React from "react";
import "./LogoSpinner.css"; // CSS same file me neeche bhi de sakta hai if needed

const LogoSpinner = ({ size = 100 }) => {
  return (
    <div className="logo-spinner-wrapper">
      <img
        src="footerlogo.png" // ✅ Make sure path is correct
        alt="Loading..."
        className="logo-spinner"
        style={{ width: size, height: size }}
      />
    </div>
  );
};




export default LogoSpinner;
