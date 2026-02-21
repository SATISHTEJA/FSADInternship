import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const InternshipDetails = () => {
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
      <h1>{internship.title}</h1>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Stipend:</strong> {internship.stipend}</p>
      <p>{internship.description}</p>

      <button onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default InternshipDetails;