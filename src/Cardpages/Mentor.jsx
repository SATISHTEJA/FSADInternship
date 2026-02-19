import React from "react";
import Cpheader from "./Cpheader";
import Footer from "../components/Footer";

const Mentor = () => {
  return (
    <>
    <Cpheader />
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mentor Feedback</h1>

        <p>
          The <strong>Mentor Feedback</strong> feature enables mentors to review
          intern performance and provide structured guidance for improvement.
        </p>

        <h2 style={styles.heading}>Key Purpose</h2>
        <p>
          Helps students understand strengths, weaknesses, and growth areas
          during the internship.
        </p>

        <h2 style={styles.heading}>Main Capabilities</h2>
        <ul>
          <li>Provide comments and performance ratings.</li>
          <li>Evaluate task quality and consistency.</li>
          <li>Support final assessment and certification.</li>
        </ul>

        <h2 style={styles.heading}>Benefits</h2>
        <ul>
          <li>Encourages continuous learning.</li>
          <li>Improves communication between mentor and student.</li>
          <li>Ensures fair evaluation.</li>
        </ul>

        <a href="/" style={styles.back}>⬅ Back to Home</a>
      </div>
    </div>
    <Footer />
</>
  );
};

export default Mentor;

const styles = {
  page: {
    minHeight: "100vh",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    maxWidth: "900px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "18px",
    padding: "40px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    lineHeight: "1.6",
  },
  title: { textAlign: "center", color: "#38bdf8" },
  heading: { color: "#a5b4fc" },
  back: {
    display: "block",
    marginTop: "30px",
    textAlign: "center",
    background: "#3b82f6",
    padding: "12px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
  },
};
