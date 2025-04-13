// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"; // react-icons imported

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        const { token, role } = res.data;
        localStorage.setItem("token", token);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        await axios.post("http://localhost:5000/api/register", {
          name,
          email,
          password,
        });

        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>{isLogin ? "Student Login" : "Student Register"}</h2>

            {!isLogin && (
              <div className="inputbox">
                <FaUser className="react-icon" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
              </div>
            )}

            <div className="inputbox">
              <FaEnvelope className="react-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="inputbox">
              <FaLock className="react-icon" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="forget">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit">{isLogin ? "Log in" : "Register"}</button>

            <div className="register">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <a href="#" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Register" : "Login"}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
