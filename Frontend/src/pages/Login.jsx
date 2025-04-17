// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm"; // ✅ Yeh component ab reusable form hai

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Navbar />

      {/* AuthForm handles the entire login/signup functionality */}
      <AuthForm redirectAfterLogin={true} />

      <Footer />
    </div>
  );
};

export default Login;
