import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const StudentDashboard = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState([]);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  /* 🔹 Load data from localStorage */
  useEffect(() => {
    const storedInternships =
      JSON.parse(localStorage.getItem("internships")) || [];
    setCompaniesData(storedInternships);

    const storedApplied =
      JSON.parse(localStorage.getItem("appliedInternships")) || [];
    setApplied(storedApplied);

    const storedProfile =
      JSON.parse(localStorage.getItem("studentProfile")) || {};
    setProfile(storedProfile);
  }, []);

  /* 🔹 Filter internships by search */
  const filteredCompanies = companiesData.filter((company) =>
    company.company.toLowerCase().includes(search.toLowerCase())
  );

  /* 🔹 Apply handler */
  const handleApply = (id) => {
    if (!applied.includes(id)) {
      const updatedApplied = [...applied, id];
      setApplied(updatedApplied);
      localStorage.setItem(
        "appliedInternships",
        JSON.stringify(updatedApplied)
      );
    }
  };

  return (
    <div className="dashboard">
      {/* 🔷 HEADER */}
      <header className="top-header">
        {/* Logo */}
        <h2 className="logo">Intern Portal</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="header-search"
        />

        {/* Profile */}
        <div
          className="profile-area"
          onClick={() => navigate("/student-profile")}
        >
          <img
            src={profile.image}
            alt="profile"
            className="avatar"
          />
          <span className="profile-name">
            {profile.name || "Student"}
          </span>
        </div>
      </header>

      {/* 🔷 PAGE TITLE */}
      <div className="page-title">
        <h1>Student Dashboard</h1>
        <p>Browse internships and track your applications</p>
      </div>

      {/* 🔷 STATS */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>{companiesData.length}</h3>
          <p>Total Opportunities</p>
        </div>

        <div className="stat-card">
          <h3>{applied.length}</h3>
          <p>Applied Internships</p>
        </div>

        <div className="stat-card">
          <h3>0%</h3>
          <p>Progress</p>
        </div>
      </section>

      {/* 🔷 INTERNSHIP CARDS */}
      <section className="cards-grid">
        {filteredCompanies.length === 0 ? (
          <p className="no-data">No internships found.</p>
        ) : (
          filteredCompanies.map((company) => (
            <div key={company.id} className="internship-card">
              <h3>{company.company}</h3>
              <p className="role">{company.role}</p>
              <p className="location">{company.location}</p>
              <p className="desc">{company.description}</p>

              <button
                onClick={() => handleApply(company.id)}
                disabled={applied.includes(company.id)}
                className={`apply-btn ${
                  applied.includes(company.id) ? "applied" : ""
                }`}
              >
                {applied.includes(company.id)
                  ? "Applied ✓"
                  : "Apply Now"}
              </button>
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

export default StudentDashboard;
