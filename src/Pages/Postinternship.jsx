import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerfordash from "../Components/Headerfordash";
import "../Styles/Dashboard.css";
import {
  FileText,
  Users,
  User,
  TrendingUp,
  LayoutDashboard,
  ClipboardCheck,
} from "lucide-react";

const Postinternship = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);

  const [form, setForm] = useState({
    title: "",
    duration: "",
    location: "Remote",
    stipend: "",
    description: "",
    requirements: "",
    skills: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("internships")) || [];
    setInternships(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.duration || !form.location) return;

    const newInternship = {
      id: Date.now(),
      ...form,
      applicants: [],
    };

    const updated = [newInternship, ...internships];

    setInternships(updated);
    localStorage.setItem("internships", JSON.stringify(updated));

    alert("Internship Posted Successfully!");

    setForm({
      title: "",
      duration: "",
      location: "Remote",
      stipend: "",
      description: "",
      requirements: "",
      skills: "",
    });
  };

  const handleDelete = (id) => {
    const updated = internships.filter((item) => item.id !== id);
    setInternships(updated);
    localStorage.setItem("internships", JSON.stringify(updated));
  };

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/admin-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className="active"
            onClick={() => navigate("/post-internship")}
          >
            <FileText size={18} />
            Post Internship
          </button>

          <button onClick={() => navigate("/applications")}>
            <Users size={18} />
            Applications
          </button>

          <button onClick={() => navigate("/track-progress")}>
            <TrendingUp size={18} />
            Track Progress
          </button>

          <button onClick={() => navigate("/evaluations")}>
            <ClipboardCheck size={18} />
            Evaluations
          </button>

          <button onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>Post New Internship</h1>
            <p>Create a new internship opportunity for students.</p>
          </div>

          <div className="form-card">
            <h2>Internship Details</h2>

            <input
              name="title"
              placeholder="Internship Title"
              value={form.title}
              onChange={handleChange}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <select name="duration" value={form.duration} onChange={handleChange}>
                <option value="">Select duration</option>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
              </select>

              <select name="location" value={form.location} onChange={handleChange}>
                <option>Remote</option>
                <option>Onsite</option>
                <option>Hybrid</option>
              </select>
            </div>

            <input
              name="stipend"
              placeholder="Monthly Stipend"
              value={form.stipend}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <textarea
              name="requirements"
              placeholder="Requirements"
              value={form.requirements}
              onChange={handleChange}
            />

            <input
              name="skills"
              placeholder="Skills (comma-separated)"
              value={form.skills}
              onChange={handleChange}
            />

            <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
              <button onClick={handleSubmit}>Post Internship</button>
              <button
                style={{ background: "#f3f4f6", color: "#111" }}
                onClick={() => navigate("/admin-dashboard")}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Posted Internships</h2>

            {internships.length === 0 ? (
              <p>No internships posted yet.</p>
            ) : (
              internships.map((item) => (
                <div key={item.id} className="application-card">
                  <div>
                    <h3>{item.title}</h3>
                    <p><strong>Duration:</strong> {item.duration}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p>{item.description}</p>
                  </div>

                  <button
                    className="quick-action secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Postinternship;