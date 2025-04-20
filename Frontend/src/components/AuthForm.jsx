import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import api from "../services/api";
import LogoSpinner from "./LogoSpinner"; // ✅ Spinner Component

const AuthForm = ({ redirectAfterLogin = true }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [loading, setLoading] = useState(false); // ✅ MOVE THIS INSIDE COMPONENT

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email,
          password,
          role: selectedRole,
        });

        const { token, role, user } = res.data;

        if (role !== selectedRole) {
          alert(`You're not authorized as ${selectedRole}`);
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (redirectAfterLogin) {
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/student-dashboard");
          }
        }
      } else {
        await api.post("/auth/register", {
          name,
          email,
          password,
          role: "student",
        });

        alert("Registration successful! Your account is pending admin approval.");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      {loading ? (
        <div className="spinner-container">
          <LogoSpinner size={100} />
        </div>
      ) : (
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 className="loginh2">{isLogin ? "Login" : "Register"}</h2>
  
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
  
              {isLogin && (
                <div className="inputbox">
                  <MdAdminPanelSettings className="react-icon" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}
  
              <div className="forget">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
  
              <button type="submit" className="auth-button">
                {isLogin ? "Log in" : "Register"}
              </button>
  
              <div className="register">
                <p>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <a href="#" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Register" : "Login"}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
  
};

export default AuthForm;
