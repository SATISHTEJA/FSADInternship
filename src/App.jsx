import React from "react";
import { Routes, Route } from "react-router-dom";

import Mainlayout from "./Layouts/Mainlayout";

import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Forgetpass from "./Pages/Forgetpass";

import ProtectedRoute from "./Components/ProtectedRoute";

// Admin
import Admindashboard from "./Pages/Admindashboard";
import Postinternship from "./Pages/Postinternship";
import Applications from "./Pages/Applications";
import TrackProgress from "./Pages/TrackProgress";
import Evaluations from "./Pages/Evaluations";
import Adminprofile from "./Pages/Adminprofile";

// Student
import Studentdashboard from "./Pages/Studentdashboard";
import BrowseInternships from "./Pages/BrowseInternships";
import MyApplications from "./Pages/MyApplications";
import MyTasks from "./Pages/MyTasks";
import Feedback from "./Pages/Feedback";
import ApplyInternship from "./Pages/ApplyInternship";
import InternshipDetails from "./Pages/InternshipDetails";
import Studentprofile from "./Pages/Studentprofile";

// Cards
import Management from "./Cardpages/Management";
import Pio from "./Cardpages/Pio";
import Profileinfo from "./Cardpages/Profileinfo";
import Mentor from "./Cardpages/Mentor";
import Progress from "./Cardpages/Progress";
import Tasks from "./Cardpages/Tasks";

const App = () => {
  return (
    <Routes>

      {/* Layout Route */}
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/Forgetpass" element={<Forgetpass />} />

      {/* ================= ADMIN PROTECTED ================= */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <Admindashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-internship"
        element={
          <ProtectedRoute allowedRole="admin">
            <Postinternship />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications"
        element={
          <ProtectedRoute allowedRole="admin">
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track-progress"
        element={
          <ProtectedRoute allowedRole="admin">
            <TrackProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluations"
        element={
          <ProtectedRoute allowedRole="admin">
            <Evaluations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-profile"
        element={
          <ProtectedRoute allowedRole="admin">
            <Adminprofile />
          </ProtectedRoute>
        }
      />

      {/* ================= STUDENT PROTECTED ================= */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <Studentdashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse-internships"
        element={
          <ProtectedRoute allowedRole="student">
            <BrowseInternships />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myapplications"
        element={
          <ProtectedRoute allowedRole="student">
            <MyApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRole="student">
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mytasks"
        element={
          <ProtectedRoute allowedRole="student">
            <MyTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <ApplyInternship />
          </ProtectedRoute>
        }
      />
      <Route
        path="/internship/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <InternshipDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-profile"
        element={
          <ProtectedRoute allowedRole="student">
            <Studentprofile />
          </ProtectedRoute>
        }
      />

      {/* Card Pages (Optional - keep open or protect if needed) */}
      <Route path="/pio" element={<Pio />} />
      <Route path="/management" element={<Management />} />
      <Route path="/profileinfo" element={<Profileinfo />} />
      <Route path="/mentor" element={<Mentor />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/tasks" element={<Tasks />} />

    </Routes>
  );
};

export default App;