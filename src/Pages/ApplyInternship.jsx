import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const internships =
    JSON.parse(localStorage.getItem("internships")) || [];

  const internship = internships.find(
    (item) => item.id === Number(id)
  );

  if (!internship) {
    return <h2 style={{ padding: "40px" }}>Internship Not Found</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Apply for {internship.title}</h1>
      <p>{internship.description}</p>

      <button
        onClick={() => {
          alert("Application submitted!");
          navigate("/browse-internships");
        }}
      >
        Submit Application
      </button>
    </div>
  );
};

export default ApplyInternship;