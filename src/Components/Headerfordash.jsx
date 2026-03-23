import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Headerdash.css";
import { LogOut, GraduationCap } from "lucide-react";

const Headerfordash = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("adminProfile"));
      if (storedUser) setUser(storedUser);
    };

    loadUser();

    // Listen for updates
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="dash-header">

      {/* LEFT */}
      <div className="dash-left">
        <div className="logo-box">
          <GraduationCap size={18} color="white" />
        </div>
        <h2 style={{ color: "black" }}>InternHub Admin</h2>
      </div>

      {/* RIGHT */}
      <div className="dash-right" style={{cursor:"pointer"}}>

        {/* NAME + EMAIL */}
        <div style={{ textAlign: "right" }}>
          <a href="admin-profile" className="headerloname"><strong style={{ fontSize: "16px", color: "black" }}>
            {user?.name || "Admin"}
          </strong></a>
          <div style={{ fontSize: "14px", color: "#6b7280" }} onClick={() => navigate("/admin-profile")} className="headerloname">
            {user?.email || "admin@gmail.com"}
          </div>
        </div>


        {/* PROFILE IMAGE */}
        <div onClick={() => navigate("/admin-profile")} style={{cursor:"pointer"}}>
          <img
            src={
              user?.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>

      </div>
    </header>
  );
};

export default Headerfordash;