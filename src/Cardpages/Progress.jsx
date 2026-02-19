import React from "react";
import Cpheader from "./Cpheader";
import Footer from "../components/Footer";

const Progress = () => {
  return (
    <>
    <Cpheader />
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        display: "flex",
        borderRadius: "10px",
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
          Progress Report
        </h1>

        <p>
          The <strong>Progress Report</strong> module allows administrators and
          mentors to monitor the development and task completion status of
          interns throughout their internship period.
        </p>

        <h2 style={{ color: "#a5b4fc" }}>Key Purpose</h2>
        <p>
          This feature ensures transparency in internship performance by
          providing structured tracking of tasks, milestones, and learning
          outcomes achieved by students.
        </p>

        <h2 style={{ color: "#a5b4fc" }}>Main Capabilities</h2>
        <ul>
          <li>Track completion of assigned internship tasks and activities.</li>
          <li>View weekly or milestone-based performance updates.</li>
          <li>Maintain submission history and evaluation records.</li>
          <li>Assist mentors in analyzing student growth and consistency.</li>
          <li>Provide clear documentation of internship progress.</li>
        </ul>

        <h2 style={{ color: "#a5b4fc" }}>Benefits</h2>
        <ul>
          <li>Improves accountability and productivity of interns.</li>
          <li>Helps mentors provide timely guidance and feedback.</li>
          <li>Ensures measurable learning outcomes during internships.</li>
          <li>Creates a transparent record for academic or career evaluation.</li>
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

export default Progress;
