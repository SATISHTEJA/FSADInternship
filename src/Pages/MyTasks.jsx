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
  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(null);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitTask = async () => {
    if (!selectedTask) {
      alert("No task selected.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter task description.");
      return;
    }

    try {
      const allTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

      const student =
        JSON.parse(localStorage.getItem("studentProfile")) || {};

      const studentIndex = allTasks.findIndex(
        (t) => t.studentEmail === student.email
      );

      if (studentIndex === -1) {
        alert("Student not found.");
        return;
      }

      const taskIndex =
        allTasks[studentIndex].tasks.findIndex(
          (t) => t.id === selectedTask.id
        );

      if (taskIndex === -1) {
        alert("Task not found.");
        return;
      }

      let fileData = null;
      let fileName = null;

      if (selectedFile) {
        fileData = await convertToBase64(selectedFile);
        fileName = selectedFile.name;
      }

      allTasks[studentIndex].tasks[taskIndex] = {
        ...allTasks[studentIndex].tasks[taskIndex],
        status: "Completed",
        submission: {
          description,
          fileName,
          fileData,
          submittedAt: new Date().toLocaleString(),
        },
      };

      localStorage.setItem("tasks", JSON.stringify(allTasks));

      alert("Task submitted successfully!");

      setSelectedTask(null);
      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

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

          <button onClick={() => navigate("/browse-internships")}>
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
          </div>

          {/* Overall Progress */}
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

          {/* Pending Tasks */}
          {pendingTasks.map((task) => (
            <div key={task.id} className="dashboard-card">
              <h4>{task.title}</h4>

              {/* Admin Assigned File */}
              {task.fileData && (
                <a
                  href={task.fileData}
                  download={task.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  📎 Download Assigned File
                </a>
              )}

              <button
                className="quick-action primary"
                onClick={() => openSubmitModal(task)}
              >
                Submit Task
              </button>
            </div>
          ))}

          {/* Completed Tasks */}
          {completedTasks.map((task) => (
            <div key={task.id} className="dashboard-card">
              <h4>{task.title}</h4>
              <p>Status: Completed</p>

              {task.fileData && (
                <a
                  href={task.fileData}
                  download={task.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  📎 Download Assigned File
                </a>
              )}

              <p>
                <strong>Description:</strong>{" "}
                {task.submission?.description}
              </p>

              {task.submission?.fileData && (
                <a
                  href={task.submission.fileData}
                  download={task.submission.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View / Download Submission
                </a>
              )}
            </div>
          ))}
        </main>
      </div>

      {/* Submit Modal */}
      {selectedTask && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-container">
            <div className="modal-header">
              <h3>Submit Task</h3>
            </div>

            <p>
              <strong>Task:</strong> {selectedTask.title}
            </p>

            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />

            <label>Upload File (Optional)</label>
            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />

            {selectedFile && (
              <p className="resume-name">
                Selected: {selectedFile.name}
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