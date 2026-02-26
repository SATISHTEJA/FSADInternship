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
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Student",
    organization: "",
    gpa: "",
    resume: null,
    resumeName: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("internships")) || [];
    setInternships(stored);

    const applied =
      JSON.parse(localStorage.getItem("appliedInternships")) || [];
    setAppliedIds(applied);
  }, []);

  const filteredInternships = internships.filter((intern) =>
    intern.title?.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.organization) {
      alert("Please fill all required fields.");
      return;
    }

    if (form.role === "Employee" && !form.resume) {
      alert("Resume is required for Employees.");
      return;
    }

    const newApplication = {
      id: Date.now(),
      internshipId: selectedIntern.id,
      internshipTitle: selectedIntern.title,
      name: form.name,
      email: form.email,
      role: form.role,
      organization: form.organization,
      gpa: form.role === "Student" ? form.gpa : null,
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

    const updatedApplied = [...appliedIds, selectedIntern.id];
    localStorage.setItem(
      "appliedInternships",
      JSON.stringify(updatedApplied)
    );
    setAppliedIds(updatedApplied);

    alert("Application submitted successfully!");
    setShowApplyModal(false);

    setForm({
      name: "",
      email: "",
      role: "Student",
      organization: "",
      gpa: "",
      resume: null,
      resumeName: "",
    });
  };

  return (
    <>
      <HeaderforStudent />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button className="active">
            <Search size={18} /> Browse Internships
          </button>

          <button onClick={() => navigate("/myapplications")}>
            <FileText size={18} /> My Applications
          </button>

          <button onClick={() => navigate("/mytasks")}>
            <ClipboardList size={18} /> My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} /> Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} /> Profile
          </button>
        </aside>

        <main className="admin-main browse-page">
          <div className="page-header">
            <h1>Browse Internships</h1>
          </div>
          <div className="browse-search-box">
  <Search size={18} />
  <input
    type="text"
    placeholder="Search by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

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

              <div style={{ display: "flex", gap: "10px" }}>
                {appliedIds.includes(intern.id) ? (
                  <button className="apply-btn" style={{ background: "green" }} disabled>
                    Applied
                  </button>
                ) : (
                  <button
                    className="apply-btn"
                    onClick={() => {
                      setSelectedIntern(intern);
                      setShowApplyModal(true);
                    }}
                  >
                    Apply Now
                  </button>
                )}

                <button
                  className="view-btn"
                  onClick={() => {
                    setSelectedIntern(intern);
                    setShowDetailsModal(true);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}

          {showApplyModal && selectedIntern && (
            <div className="modal-overlay">
              <div className="modal-container">

                <div className="modal-header">
                  <h2>Apply for {selectedIntern.title}</h2>
                  <X size={20} onClick={() => setShowApplyModal(false)} />
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

                <label>Role *</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value, organization: "" })
                  }
                >
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                </select>

                <div className="apply-modal-row">
                  <div className="apply-modal-col organization-col">
                    <label>
                      {form.role === "Student"
                        ? "University / College Name *"
                        : "Company Name *"}
                    </label>
                    <input
                      value={form.organization}
                      onChange={(e) =>
                        setForm({ ...form, organization: e.target.value })
                      }
                    />
                  </div>

                  {form.role === "Student" && (
                    <div className="apply-modal-col gpa-col">
                      <label>GPA</label>
                      <input
                        value={form.gpa}
                        onChange={(e) =>
                          setForm({ ...form, gpa: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>

                <label>
                  Upload Resume* {form.role === "Employee"}
                </label>
                <input type="file" onChange={handleFileUpload} />

                {form.resumeName && (
                  <p className="resume-name">Selected: {form.resumeName}</p>
                )}

                <div className="modal-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowApplyModal(false)}
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

          {showDetailsModal && selectedIntern && (
            <div className="modal-overlay">
              <div className="modal-container">
                <div className="modal-header">
                  <h2>Internship Details</h2>
                  <X size={20} onClick={() => setShowDetailsModal(false)} />
                </div>

                <p><strong>Title:</strong> {selectedIntern.title}</p>
                <p><strong>Company:</strong> {selectedIntern.company}</p>
                <p><strong>Location:</strong> {selectedIntern.location}</p>
                <p><strong>Duration:</strong> {selectedIntern.duration}</p>
                <p><strong>Stipend:</strong> {selectedIntern.stipend}</p>
                <p><strong>Description:</strong> {selectedIntern.description}</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default BrowseInternships;