import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Headerdash.css";
import { LogOut, GraduationCap } from "lucide-react";

const Headerfordash = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("studentProfile");
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  

  return (
    <header className="dash-header">
      <div className="dash-left">
              <div className="logo-box">
                <GraduationCap size={18} color="white" />
              </div>
              <h2 style={{color:"black"}}>InternHub Admin</h2>
            </div>

      <div className="dash-right">
        
       <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
};

export default Headerfordash;