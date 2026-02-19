import React from "react";
import Cpheader from "./Cpheader";
import "../Styles/cardH.css";
import Footer from "../components/Footer";

const Pio = () => {
  return (
    <>
      <Cpheader />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "white",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            lineHeight: "1.6",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#38bdf8" }}>
            Post Internship Opportunities
          </h1>

          <p>
            The <strong>Post Internship Opportunities</strong> feature allows
            administrators to create, manage, and publish internship openings
            for students in a centralized remote internship management system.
          </p>

          <h2 style={{ color: "#a5b4fc" }}>Key Purpose</h2>
          <p>
            This module ensures that internship opportunities are clearly
            described, properly organized, and easily accessible to students
            seeking real-world experience.
          </p>

          <h2 style={{ color: "#a5b4fc" }}>Main Capabilities</h2>
          <ul>
            <li>Create internship listings with role, duration, and requirements.</li>
            <li>Provide detailed descriptions and expected outcomes.</li>
            <li>Update or remove outdated postings.</li>
            <li>Allow students to view and apply for opportunities.</li>
            <li>Maintain a centralized internship database.</li>
          </ul>

          <h2 style={{ color: "#a5b4fc" }}>Benefits</h2>
          <ul>
            <li>Simplifies internship management for admins.</li>
            <li>Improves opportunity visibility for students.</li>
            <li>Ensures transparency and structured workflow.</li>
            <li>Supports remote internship ecosystems.</li>
          </ul>

          <a
            href="/"
            style={{
              display: "block",
              marginTop: "30px",
              textAlign: "center",
              background: "#3b82f6",
              padding: "12px",
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
            }}
          >
            ⬅ Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pio;
