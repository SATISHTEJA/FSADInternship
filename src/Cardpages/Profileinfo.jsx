import React from "react";
import Cpheader from "./Cpheader";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <>
    <Cpheader />
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Profile Management</h1>

        <p>
          The <strong>Profile Management</strong> module allows users to maintain
          personal, academic, and internship-related information in one place.
        </p>

        <h2 style={styles.heading}>Capabilities</h2>
        <ul>
          <li>Edit personal and academic details.</li>
          <li>Upload resumes and documents.</li>
          <li>Track internship history and achievements.</li>
        </ul>

        <h2 style={styles.heading}>Benefits</h2>
        <ul>
          <li>Centralized student identity.</li>
          <li>Easy verification for mentors/admins.</li>
          <li>Professional digital portfolio.</li>
        </ul>

        <a href="/" style={styles.back}>⬅ Back to Home</a>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;

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
