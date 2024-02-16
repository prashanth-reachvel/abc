import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { username, email, password })
      .then((result) => {
        console.log(result);
        navigate("/"); // Redirects to Signin Page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-main-container">
      <div className="register-inner-container">
        <img
          src="../../public/register.jpg"
          alt="register_img"
          className="register-bg-image"
        />
      </div>
      <div style={{ width: "530px", height: "283px", marginLeft: "50px" }}>
        <p style={{ fontSize: "24px", fontWeight: "700", color: "#046A38" }}>
          Welcome to Seva Bharat
        </p>
        <p style={{ fontSize: "24px", fontWeight: "700", color: "#046A38" }}>
          Sign In
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "16px", fontWeight: "400" }}>
              Username :
            </label>
            <input
              type="text"
              className="input-element"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "16px", fontWeight: "400" }}>
              Email :
            </label>
            <input
              type="email"
              className="input-element email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: "16px", fontWeight: "400" }}>
              Password :
            </label>
            <input
              type="password"
              className="input-element"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="btn-container">
            <button type="submit" className="register-button">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
