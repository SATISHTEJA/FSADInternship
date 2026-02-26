import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backreg from "../assets/backreg.png";
import "../Styles/Loginstyling.css";

const Register = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <>
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${backreg})` }}
      >
        <div className="login-card">

          <div className="role-switch">
            <button
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              Student
            </button>

            <button
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          <h2>Register as {role === "student" ? "Student" : "Admin"}</h2>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button className="login-btn" onClick={handleRegister}>
            REGISTER
          </button>

          <br />

          <div className="link-row">
            <a href="/login" className="registerbut">Already have an account? Login</a>
            <a href="/" className="registerbut">Back to Home</a>
            </div>
          </div>

        </div>
    </>
  );
};

export default Register;
