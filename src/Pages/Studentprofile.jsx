import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    course: "",
    image: "",
  });

  /* 🔹 Load profile from localStorage */
  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("studentProfile")) || {};
    setProfile(savedProfile);
  }, []);

  /* 🔹 Handle text change */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* 🔹 Handle image upload */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Delete profile photo */
  const handleDeletePhoto = () => {
    setProfile({ ...profile, image: "" });
  };

  /* 🔹 Save profile */
  const handleSave = () => {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  return (
    <div className="dashboard">
      <h1>Student Profile</h1>

      <div className="form-card">
        {/* Profile Image */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <img
            src={profile.image}
            alt="profile"
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <input type="file" onChange={handleImageUpload} />

            {profile.image && (
              <button
                type="button"
                onClick={handleDeletePhoto}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete Photo
              </button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <input
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Course"
          value={profile.course}
          onChange={handleChange}
        />

        <button onClick={handleSave}>Save Profile</button>
      </div>
    </div>
  );
};

export default StudentProfile;
