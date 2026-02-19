import React from "react";
import Cpheader from "./Cpheader";
import Footer from "../components/Footer";

const Tasks = () => {
  return (
    <>
    <Cpheader />
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Apply & Track Tasks</h1>

        <p>
          Students can apply for internships, view assigned tasks, submit work,
          and monitor completion status.
        </p>

        <ul>
          <li>Task assignment and deadlines.</li>
          <li>Submission tracking.</li>
          <li>Performance monitoring.</li>
        </ul>

        <a href="/" style={styles.back}>⬅ Back to Home</a>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Tasks;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    borderRadius: "10px",
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

