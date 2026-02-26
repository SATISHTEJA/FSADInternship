import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerfordash from "../Components/Headerfordash";
import "../Styles/Dashboard.css";
import {FileText,User,Users,UserCheck,TrendingUp,LayoutDashboard,ClipboardCheck} from "lucide-react";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    image: "",
  });

  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("adminProfile")) || {};
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
    localStorage.setItem("adminProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        
        <aside className="admin-sidebar">
        
          <button  onClick={() => navigate("/admin-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>
        
          <button onClick={() => navigate("/post-internship")}>
            <FileText size={18} />
            Post Internship
          </button>
        
          <button
            onClick={() => navigate("/applications")}
          >
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
        
          <button className="active" onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        
        </aside>
        <main className="admin-main">

          <div className="page-header">
            <h1>Admin Profile</h1>
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

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
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
              placeholder="Admin Name"
              value={profile.name || ""}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Admin Email"
              value={profile.email || ""}
              onChange={handleChange}
            />

            <input
              name="company"
              placeholder="Company Name"
              value={profile.company || ""}
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

export default AdminProfile;