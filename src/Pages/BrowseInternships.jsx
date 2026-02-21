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
  MapPin,
  Clock,
  DollarSign,
  X,
} from "lucide-react";

const BrowseInternships = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    gpa: "",
    resume: null,
    resumeName: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("internships")) || [];
    setInternships(stored);
  }, []);

  /* ===== Stats Calculation ===== */

  const totalApplicants = JSON.parse(
    localStorage.getItem("applications")
  ) || [];

  const totalCompanies = [
    ...new Set(internships.map((intern) => intern.company || "Company")),
  ].length;

  const filteredInternships = internships.filter((intern) =>
    intern.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== Resume Upload ===== */

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({
        ...form,
        resume: reader.result,
        resumeName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  /* ===== Submit Application ===== */

  const handleSubmit = () => {
  if (!form.name || !form.email) {
    alert("Name and Email are required");
    return;
  }

  const newApplication = {
    id: Date.now(),
    internshipTitle: selectedIntern.title,
    name: form.name,
    email: form.email,
    university: form.university,
    gpa: form.gpa,
    resume: form.resume || null,
    resumeName: form.resumeName || "",
    status: "Pending",
  };

  const existing =
    JSON.parse(localStorage.getItem("applications")) || [];

  localStorage.setItem(
    "applications",
    JSON.stringify([newApplication, ...existing])
  );

  alert("Application submitted successfully!");
  setShowModal(false);

  setForm({
    name: "",
    email: "",
    university: "",
    gpa: "",
    resume: null,
    resumeName: "",
  });
};


  return (
    <>
      <HeaderforStudent />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        {/* ===== SIDEBAR ===== */}
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="active">
            <Search size={18} />
            Browse Internships
          </button>

          <button onClick={() => navigate("/myapplications")}>
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

        {/* ===== MAIN ===== */}
        <main className="admin-main browse-page">

          {/* Header */}
          <div className="page-header">
            <h1>Browse Internships</h1>
            <p>Discover and apply to remote internship opportunities.</p>
          </div>

          {/* Search */}
          <div className="browse-search-box">
            <Search size={18} />
            <input
              placeholder="Search by title, company, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ===== STAT CARDS ===== */}
          <div className="stats-grid">

            <div className="stat-card">
              <h4>Available Opportunities</h4>
              <h2>{internships.length}</h2>
            </div>

            <div className="stat-card">
              <h4>Companies Hiring</h4>
              <h2>{totalCompanies}</h2>
            </div>

            <div className="stat-card">
              <h4>Total Applicants</h4>
              <h2>{totalApplicants.length}</h2>
            </div>

          </div>

          {/* ===== INTERNSHIP LIST ===== */}
          {filteredInternships.map((intern) => (
            <div key={intern.id} className="browse-card">

              <div>
                <h3>{intern.title}</h3>

                <div className="browse-meta">
                  <span><MapPin size={16}/> {intern.location}</span>
                  <span><Clock size={16}/> {intern.duration}</span>
                  <span><DollarSign size={16}/> {intern.stipend}</span>
                </div>

                <p>{intern.description}</p>
              </div>

              <button
                className="apply-btn"
                onClick={() => {
                  setSelectedIntern(intern);
                  setShowModal(true);
                }}
              >
                Apply Now
              </button>

            </div>
          ))}

          {/* ===== MODAL ===== */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-container">

                <div className="modal-header">
                  <h2>Apply for {selectedIntern.title}</h2>
                  <X size={20} onClick={() => setShowModal(false)} />
                </div>

                <label>Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <label>Email *</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <label>University *</label>
                <input
                  value={form.university}
                  onChange={(e) =>
                    setForm({ ...form, university: e.target.value })
                  }
                />

                <label>GPA *</label>
                <input
                  value={form.gpa}
                  onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                />

                <label>Upload Resume (optional)</label>
                <input type="file" onChange={handleFileUpload} />

                {form.resumeName && (
                  <p className="resume-name">
                    Selected: {form.resumeName}
                  </p>
                )}

                <div className="modal-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit Application
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default BrowseInternships;