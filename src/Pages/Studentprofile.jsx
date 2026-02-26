import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderforStudent from "../Components/HeaderforStudent";
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  Search,
  FileText,ClipboardList,
  CheckSquare,
  MessageSquare,
  User
} from "lucide-react";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    university: "",
    image: "",
  });

  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("studentProfile")) || {};
    setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    setProfile({ ...profile, image: "" });
  };

  const handleSave = () => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

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

          <button className="active">
            <User size={18} />
            Profile
          </button>

        </aside>

        <main className="admin-main">

          <div className="page-header">
            <h1>Student Profile</h1>
            <p>Manage your profile information.</p>
          </div>

          <div className="form-card" style={{ maxWidth: "700px" }}>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={
                  profile.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <input type="file" onChange={handleImageUpload} />

                {profile.image && (
                  <button
                    onClick={handleDeletePhoto}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete Photo
                  </button>
                )}
              </div>
            </div>

            <input
              name="name"
              placeholder="Full Name"
              value={profile.name || ""}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={profile.email || ""}
              onChange={handleChange}
            />

            <input
              name="university"
              placeholder="University / College"
              value={profile.university || ""}
              onChange={handleChange}
            />

            <button onClick={handleSave}>
              Save Profile
            </button>

          </div>

        </main>
      </div>
    </>
  );
};

export default StudentProfile;