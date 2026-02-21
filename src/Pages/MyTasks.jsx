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
} from "lucide-react";

const MyTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const allTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const student =
      JSON.parse(localStorage.getItem("studentProfile")) || {};

    if (!student.email) {
      setTasks([]);
      return;
    }

    const studentData = allTasks.find(
      (t) => t.studentEmail === student.email
    );

    if (studentData && Array.isArray(studentData.tasks)) {
      setTasks(studentData.tasks);
    } else {
      setTasks([]);
    }
  };

  const openSubmitModal = (task) => {
    setSelectedTask(task);
    setDescription("");
    setFileName("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmitTask = () => {
    if (!selectedTask || !description.trim()) {
      alert("Please enter task description.");
      return;
    }

    const allTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const student =
      JSON.parse(localStorage.getItem("studentProfile")) || {};

    const studentIndex = allTasks.findIndex(
      (t) => t.studentEmail === student.email
    );

    if (studentIndex !== -1) {
      const taskIndex =
        allTasks[studentIndex].tasks.findIndex(
          (t) => t.id === selectedTask.id
        );

      if (taskIndex !== -1) {
        allTasks[studentIndex].tasks[taskIndex] = {
          ...allTasks[studentIndex].tasks[taskIndex],
          status: "Completed",
          submission: {
            description,
            fileName,
            submittedAt: new Date().toISOString(),
          },
        };

        localStorage.setItem("tasks", JSON.stringify(allTasks));
      }
    }

    setSelectedTask(null);
    loadTasks();
  };

  // ==== CALCULATIONS ====

  const completedTasks = tasks.filter(
    (t) => t.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (t) => t.status !== "Completed"
  );

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <>
      <HeaderforStudent />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/browse")}>
            <Search size={18} />
            Browse Internships
          </button>

          <button onClick={() => navigate("/myapplications")}>
            <FileText size={18} />
            My Applications
          </button>

          <button className="active">
            <ClipboardList size={18} />
            My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} />
            Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>My Tasks</h1>
            <p>Manage and track your internship assignments.</p>
          </div>

          {/* ==== PROGRESS SECTION ==== */}
          <div className="dashboard-card">
            <h3>Overall Task Completion</h3>

            <div className="progress-bar" style={{ margin: "10px 0" }}>
              <div
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <strong>{completionPercentage}%</strong>
          </div>

          {/* ==== PENDING TASKS ==== */}
          {pendingTasks.map((task) => (
            <div key={task.id} className="dashboard-card">
              <h4>{task.title}</h4>
              <p>
                <strong>Question:</strong>{" "}
                {task.question || "No question provided"}
              </p>

              <button
                className="quick-action primary"
                onClick={() => openSubmitModal(task)}
              >
                Submit Task
              </button>
            </div>
          ))}

          {/* ==== COMPLETED TASKS ==== */}
          {completedTasks.map((task) => (
            <div key={task.id} className="dashboard-card">
              <h4>{task.title}</h4>
              <p>Status: Completed</p>
              <p>
                <strong>Your Submission:</strong>{" "}
                {task.submission?.description}
              </p>
              {task.submission?.fileName && (
                <p>File: {task.submission.fileName}</p>
              )}
            </div>
          ))}
        </main>
      </div>

      {/* ===== SUBMIT MODAL ===== */}
      {selectedTask && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-container">
            <div className="modal-header">
              <h3>Submit Task</h3>
            </div>

            <p>
              <strong>Task:</strong>{" "}
              {selectedTask.title || "N/A"}
            </p>

            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
            />

            <label>Upload File (Optional)</label>
            <input type="file" onChange={handleFileUpload} />

            {fileName && (
              <p className="resume-name">
                Selected: {fileName}
              </p>
            )}

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedTask(null)}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={handleSubmitTask}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTasks;