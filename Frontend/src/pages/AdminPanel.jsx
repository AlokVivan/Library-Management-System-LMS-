import React from "react";
import { Outlet } from "react-router-dom";
import Navbaradmin from "../components/Navbaradmin";
import Footer from "../components/Footer";
import Sidebaradmin from "../components/Sidebaradmin";
import "../styles/AdminPanel.css"; // Ensure this file contains necessary styles

export default function AdminPanel() {
  return (
    <div className="admin-panel">
      <Navbaradmin /> {/* This will be the top navbar */}
      
      <div className="admin-panel-content">
        <Sidebaradmin /> {/* This will be the left sidebar for navigation */}

        <Footer/>
        
        <div className="main-content">
          <Outlet /> {/* This will render nested routes here */}
        </div>
      </div>
    </div>
  );
}
