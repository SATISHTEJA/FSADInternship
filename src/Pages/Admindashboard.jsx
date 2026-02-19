import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    description: "",
  });

  const navigate = useNavigate();

  /* 🔹 Load internships + profile */
  useEffect(() => {
    const storedInternships =
      JSON.parse(localStorage.getItem("internships")) || [];
    setInternships(storedInternships);

    const storedProfile =
      JSON.parse(localStorage.getItem("adminProfile")) || {};
    setProfile(storedProfile);
  }, []);

  /* 🔹 Handle input change */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔹 Post internship */
  const handlePost = () => {
    if (!form.company || !form.role || !form.location) return;

    const newInternship = {
      id: Date.now(),
      ...form,
    };

    const updated = [newInternship, ...internships];

    setInternships(updated);
    localStorage.setItem("internships", JSON.stringify(updated));

    setForm({
      company: "",
      role: "",
      location: "",
      description: "",
    });
  };

  /* 🔹 Delete internship */
  const handleDelete = (id) => {
    const filtered = internships.filter((item) => item.id !== id);
    setInternships(filtered);
    localStorage.setItem("internships", JSON.stringify(filtered));
  };

  return (
    <div className="dashboard">

      {/* 🔷 HEADER */}
      <header className="top-header">
        <h2 className="logo">Intern Portal - Admin</h2>

        <div
          className="profile-area"
          onClick={() => navigate("/admin-profile")}
        >
          <img
            src={profile.image}
            alt="profile"
            className="avatar"
          />
          <span className="profile-name">
            {profile.name || "Admin"}
          </span>
        </div>
      </header>

      {/* 🔷 PAGE TITLE */}
      <div className="page-title">
        <h1>Admin Dashboard</h1>
        <p>Manage internship postings and evaluations</p>
      </div>

      {/* 🔷 STATS */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>{internships.length}</h3>
          <p>Total Internships</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Active Interns</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Pending Evaluations</p>
        </div>
      </section>

      {/* 🔷 POST FORM */}
      <section className="form-card">
        <h2>Post New Internship</h2>

        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          name="role"
          placeholder="Internship Role"
          value={form.role}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Internship Description"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={handlePost}>Post Internship</button>
      </section>

      {/* 🔷 INTERNSHIP CARDS */}
      <section className="cards-grid">
        {internships.length === 0 ? (
          <p className="no-data">No internships posted yet.</p>
        ) : (
          internships.map((item) => (
            <div key={item.id} className="internship-card">

              <div className="card-header">
                <h3>{item.company}</h3>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  ✕
                </button>
              </div>

              <p className="role">{item.role}</p>
              <p className="location">{item.location}</p>
              <p className="desc">{item.description}</p>
            </div>
          ))
        )}
      </section>
      <div >
        <a href="/login" className="back-home">Logout</a>
       </div>
       <div style={{textAlign: "center", margin: "20px 0"}}>
      </div>
    </div>
  );
};

export default AdminDashboard;
