import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import Headerfordash from "../Components/Headerfordash";
import {
  FileText,
  Users,
  UserCheck,
  TrendingUp,
  LayoutDashboard,
  ClipboardCheck,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  const loadData = () => {
    const storedInternships =
      JSON.parse(localStorage.getItem("internships")) || [];

    const storedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setInternships(storedInternships);
    setApplications(storedApplications);
  };

  useEffect(() => {
    loadData();

    window.addEventListener("dataUpdated", loadData);

    return () => {
      window.removeEventListener("dataUpdated", loadData);
    };
  }, []);


  const underReview = applications.filter(
    (app) => app.status === "Under Review"
  ).length;

  const approved = applications.filter(
    (app) => app.status === "Approved"
  );

  const avgCompletion = approved.length
    ? Math.round(
        approved.reduce((sum, app) => sum + (app.progress || 0), 0) /
          approved.length
      )
    : 0;

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button
            className="active"
            onClick={() => navigate("/admin-dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/post-internship")}>
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
            <h1>Dashboard</h1>
            <p>
              Welcome back! Here's an overview of your internship programs.
            </p>
          </div>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-left">
                <p>Active Internships</p>
                <h3>{internships.length}</h3>
              </div>
              <FileText className="stat-icon blue" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Pending Applications</p>
                <h3>{underReview}</h3>
              </div>
              <Users className="stat-icon orange" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Active Interns</p>
                <h3>{approved.length}</h3>
              </div>
              <UserCheck className="stat-icon green" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Avg Completion</p>
                <h3>{avgCompletion}%</h3>
              </div>
              <TrendingUp className="stat-icon purple" size={32} />
            </div>
          </section>

          <section className="dashboard-card">
  <h2>Quick Actions</h2>

  <div className="quick-actions-grid">

    <button
      className="quick-action primary"
      onClick={() => navigate("/post-internship")}
    >
      <FileText size={18} />
      Post New Internship
    </button>

    <button
      className="quick-action secondary"
      onClick={() => navigate("/applications")}
    >
      <Users size={18} />
      Review Applications
    </button>

    <button
      className="quick-action secondary"
      onClick={() => navigate("/evaluations")}
    >
      <ClipboardCheck size={18} />
      Create Evaluation
    </button>

  </div>
</section>

          <section className="dashboard-card">
            <h2>Recent Applications</h2>

            {applications.length === 0 ? (
              <p style={{ color: "#6b7280" }}>
                No applications found.
              </p>
            ) : (
              applications.slice(0, 3).map((app) => (
                <div key={app.id} className="recent-card">
                  <div>
                    <h4>{app.studentName}</h4>
                    <p>{app.internshipTitle}</p>
                    <small>Applied: {app.appliedDate}</small>
                  </div>

                  <span
                    className={`status-badge ${app.status.replace(
                      " ",
                      "-"
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            )}

            <div
              className="view-all-link"
              onClick={() => navigate("/applications")}
              style={{ cursor: "pointer", marginTop: "10px" }}
            >
              View All Applications →
            </div>
          </section>

          <section className="dashboard-card">
            <h2>Intern Progress Overview</h2>

            {approved.length === 0 ? (
              <p style={{ color: "#6b7280" }}>
                No approved interns yet.
              </p>
            ) : (
              approved.slice(0, 3).map((intern) => (
                <div key={intern.id} className="progress-card">
                  <div className="progress-header">
                    <h4>{intern.studentName}</h4>
                    <span>{intern.progress || 0}%</span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${intern.progress || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;