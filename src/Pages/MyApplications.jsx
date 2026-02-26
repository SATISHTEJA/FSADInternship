import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderforStudent from "../Components/HeaderforStudent";
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardList,
  MessageSquare,
  User,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
} from "lucide-react";

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps =
      JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(storedApps);
  }, []);

  const total = applications.length;
  const underReview = applications.filter(
    (app) => app.status === "Under Review"
  ).length;
  const approved = applications.filter(
    (app) => app.status === "Approved"
  ).length;
  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <>
      <HeaderforStudent />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/browse-internships")}>
            <Search size={18} />
            Browse Internships
          </button>

          <button className="active">
            <FileText size={18} />
            My Applications
          </button>

          <button onClick={() => navigate("/mytasks")}>
            <ClipboardList size={18} />
            My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} />
            Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">

          <div className="page-header">
            <h1>My Applications</h1>
            <p>Track the status of your internship applications.</p>
          </div>

          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-left">
                <p>Total Applications</p>
                <h3>{total}</h3>
              </div>
              <FileCheck className="stat-icon blue" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Under Review</p>
                <h3>{underReview}</h3>
              </div>
              <Clock className="stat-icon orange" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Approved</p>
                <h3>{approved}</h3>
              </div>
              <CheckCircle className="stat-icon green" size={32} />
            </div>

            <div className="stat-card">
              <div className="stat-left">
                <p>Rejected</p>
                <h3>{rejected}</h3>
              </div>
              <XCircle className="stat-icon purple" size={32} />
            </div>

          </section>

          {applications.length === 0 ? (
            <div className="dashboard-card">
              <p>You haven't applied to any internships yet.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="application-card">

                <div>
                  <h3>{app.internshipTitle}</h3>
                  <p style={{ color: "#6b7280" }}>
                    {app.company || "Company"}
                  </p>

                  <div className="progress-meta">
                    <div>
                      <MapPin size={16} />
                      {app.location || "Remote"}
                    </div>

                    <div>
                      <Calendar size={16} />
                      Applied: {app.appliedDate || "N/A"}
                    </div>
                  </div>

                  {app.status === "Approved" && (
                    <div className="dashboard-card" style={{ marginTop: "15px", background: "#ecfdf5", border: "1px solid #bbf7d0" }}>
                      🎉 Congratulations! Your application has been approved.
                    </div>
                  )}

                  {app.status === "Under Review" && (
                    <div className="dashboard-card" style={{ marginTop: "15px", background: "#fef9c3", border: "1px solid #fde68a" }}>
                      ⏳ Your application is currently under review.
                    </div>
                  )}

                  {app.status === "Rejected" && (
                    <div className="dashboard-card" style={{ marginTop: "15px", background: "#fee2e2", border: "1px solid #fecaca" }}>
                      ❌ Unfortunately, your application was rejected.
                    </div>
                  )}

                </div>

                <div>
                  <span className={`status-badge ${app.status.replace(" ", "-")}`}>
                    {app.status}
                  </span>
                </div>

              </div>
            ))
          )}

        </main>
      </div>
    </>
  );
};

export default MyApplications;