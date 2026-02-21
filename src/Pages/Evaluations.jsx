import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headerfordash from "../Components/Headerfordash";
import "../Styles/Dashboard.css";
import {
  FileText,
  Users,
  User,
  UserCheck,
  TrendingUp,
  LayoutDashboard,
  ClipboardCheck,
} from "lucide-react";

const Evaluations = () => {
  const navigate = useNavigate();

  const [approvedInterns, setApprovedInterns] = useState([]);
  const [selectedInternEmail, setSelectedInternEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [technical, setTechnical] = useState("");
  const [communication, setCommunication] = useState("");
  const [workEthic, setWorkEthic] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [evaluations, setEvaluations] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];

    // filter approved interns
    const approved = apps.filter(
      (app) => app.status === "Approved"
    );

    setApprovedInterns(approved);

    const storedEvaluations =
      JSON.parse(localStorage.getItem("evaluations")) || [];
    setEvaluations(storedEvaluations);
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!selectedInternEmail || rating === 0) {
      alert("Please select intern and give rating.");
      return;
    }

    const selectedIntern = approvedInterns.find(
      (intern) => intern.email === selectedInternEmail
    );

    const newEvaluation = {
      id: Date.now(),
      internName: selectedIntern?.name,
      internEmail: selectedInternEmail,
      rating,
      technical,
      communication,
      workEthic,
      strengths,
      improvements,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEvaluation, ...evaluations];

    setEvaluations(updated);
    localStorage.setItem("evaluations", JSON.stringify(updated));

    alert("Evaluation submitted successfully!");

    // Reset
    setSelectedInternEmail("");
    setRating(0);
    setTechnical("");
    setCommunication("");
    setWorkEthic("");
    setStrengths("");
    setImprovements("");
  };

  /* ================= STATS ================= */
  const totalEvaluations = evaluations.length;

  const avgRating =
    totalEvaluations === 0
      ? 0
      : (
          evaluations.reduce((a, b) => a + b.rating, 0) /
          totalEvaluations
        ).toFixed(1);

  const outstanding = evaluations.filter(
    (e) => e.rating >= 4
  ).length;

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/admin-dashboard")}>
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

          <button
            className="active"
            onClick={() => navigate("/evaluations")}
          >
            <ClipboardCheck size={18} />
            Evaluations
          </button>

          <button onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        {/* MAIN */}
        <main className="admin-main">

          <div className="page-header">
            <h1>Intern Evaluations</h1>
            <p>
              Provide feedback and performance evaluations for interns.
            </p>
          </div>

          {/* ===== STATS ===== */}
          <section className="stats-grid">
            <div className="stat-card">
              <div>
                <p>Total Evaluations</p>
                <h3>{totalEvaluations}</h3>
              </div>
              <ClipboardCheck size={30} />
            </div>

            <div className="stat-card">
              <div>
                <p>Average Rating</p>
                <h3>{avgRating}/5</h3>
              </div>
              <TrendingUp size={30} />
            </div>

            <div className="stat-card">
              <div>
                <p>Outstanding Interns</p>
                <h3>{outstanding}</h3>
              </div>
              <UserCheck size={30} />
            </div>
          </section>

          {/* ===== FORM ===== */}
          <div className="form-card">
            <h2>Create New Evaluation</h2>

            <label>Select Intern *</label>
            <select
              value={selectedInternEmail}
              onChange={(e) =>
                setSelectedInternEmail(e.target.value)
              }
            >
              <option value="">Choose an intern</option>

              {approvedInterns.map((intern) => (
                <option key={intern.id} value={intern.email}>
                  {intern.name} ({intern.email})
                </option>
              ))}
            </select>

            <label>Overall Rating *</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    star <= rating ? "star active" : "star"
                  }
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="three-cols">
              <select
                value={technical}
                onChange={(e) =>
                  setTechnical(e.target.value)
                }
              >
                <option value="">Technical Skills</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>

              <select
                value={communication}
                onChange={(e) =>
                  setCommunication(e.target.value)
                }
              >
                <option value="">Communication</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>

              <select
                value={workEthic}
                onChange={(e) =>
                  setWorkEthic(e.target.value)
                }
              >
                <option value="">Work Ethic</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>

            <textarea
              placeholder="Key Strengths"
              value={strengths}
              onChange={(e) =>
                setStrengths(e.target.value)
              }
            />

            <textarea
              placeholder="Areas for Improvement"
              value={improvements}
              onChange={(e) =>
                setImprovements(e.target.value)
              }
            />

            <div className="quick-actions-row">
              <button
                className="primary-btn"
                onClick={handleSubmit}
              >
                Submit Evaluation
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  navigate("/admin-dashboard")
                }
              >
                Cancel
              </button>
            </div>
          </div>

          {/* ===== RECENT EVALUATIONS ===== */}
          <div className="dashboard-card">
            <h2>Recent Evaluations</h2>

            {evaluations.length === 0 ? (
              <p>No evaluations yet.</p>
            ) : (
              evaluations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="evaluation-card"
                >
                  <h3>{item.internName}</h3>
                  <strong>⭐ {item.rating}/5</strong>
                  <p>
                    Technical: {item.technical} | Communication:{" "}
                    {item.communication} | Work Ethic:{" "}
                    {item.workEthic}
                  </p>
                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </>
  );
};

export default Evaluations;