import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Headerdash.css";
import { LogOut, GraduationCap } from "lucide-react";

const Headerfordash = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="dash-header">
      <div className="dash-left">
        <div className="logo-box">
          <GraduationCap size={18} color="white" />
        </div>
        <h2 style={{ color: "black" }}>
          InternHub Admin
        </h2>
      </div>

      <div className="dash-right">
        <div style={{ textAlign: "right" }}>
          <strong style={{ color: "black" }}>
            {user?.name || "Admin"}
          </strong>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            {user?.email || "admin@gmail.com"}
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Headerfordash;