import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/loginbg.png";
import "../Styles/Loginstyling.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(location.state?.role || "student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("role");

    if (isLoggedIn) {
      if (storedRole === "student") navigate("/student-dashboard");
      else if (storedRole === "admin") navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {

    if (
      role === "admin" &&
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin-dashboard");
      return;
    }

    if (
      role === "student" &&
      email === "student@gmail.com" &&
      password === "1234"
    ) {
      localStorage.setItem("role", "student");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/student-dashboard");
      return;
    }
    alert("Invalid credentials or role mismatch!");
  };

  return (
    <div
      className="login-bg"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="login-card">

        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => {setRole("student");setEmail("");setPassword("")}}
          >
            Student
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => {setRole("admin");setEmail("");setPassword("")}}
          >
            Admin
          </button>
        </div>

        <h2>Login as {role === "student" ? "Student" : "Admin"}</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          LOGIN
        </button>

        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Demo:<br />
          Admin → admin@gmail.com / admin123 <br />
          Student → student@gmail.com / 1234
        </p>

        <br />

        <Link to="/Forgetpass" className="forgot">
          Forgot Password?
        </Link>

        <div className="link-row">
          <Link to="/register" className="usealignleft">
            Don't have an account? Register
          </Link>

          <Link to="/" className="usealignright">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;