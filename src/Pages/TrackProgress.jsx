import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headerfordash from "../Components/Headerfordash";
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  ClipboardCheck,
  User,
} from "lucide-react";

const TrackProgress = () => {
  const navigate = useNavigate();

  const [approvedStudents, setApprovedStudents] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    const approved = apps.filter((app) => app.status === "Approved");
    setApprovedStudents(approved);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasksData(storedTasks);
  };

  const getStudentTasks = (email) => {
    return tasksData.find((t) => t.studentEmail === email);
  };

  const getProgress = (email) => {
    const student = getStudentTasks(email);
    if (!student || !student.tasks) return 0;

    const total = student.tasks.length;
    const completed = student.tasks.filter(
      (t) => t.status === "Completed"
    ).length;

    return total === 0
      ? 0
      : Math.round((completed / total) * 100);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject("File reading failed");
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      alert("Please select a student first.");
      return;
    }

    if (!newTask.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      const allTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

      const index = allTasks.findIndex(
        (s) => s.studentEmail === selectedStudent.email
      );

      let fileData = null;
      let fileName = null;

      if (selectedFile) {
        if (selectedFile.size > 1024 * 1024) {
          alert("File too large. Please upload under 1MB.");
          return;
        }

        fileData = await convertToBase64(selectedFile);
        fileName = selectedFile.name;
      }

      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        status: "Pending",
        fileData,
        fileName,
      };

      if (index !== -1) {
        allTasks[index].tasks.push(newTaskObject);
      } else {
        allTasks.push({
          studentEmail: selectedStudent.email,
          internshipTitle: selectedStudent.internshipTitle,
          tasks: [newTaskObject],
        });
      }

      localStorage.setItem("tasks", JSON.stringify(allTasks));

      alert("Task Assigned Successfully!");

      setNewTask("");
      setSelectedFile(null);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading file.");
    }
  };

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button type="button" onClick={() => navigate("/admin-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button type="button" onClick={() => navigate("/post-internship")}>
            <FileText size={18} />
            Post Internship
          </button>

          <button type="button" onClick={() => navigate("/applications")}>
            <Users size={18} />
            Applications
          </button>

          <button className="active" type="button">
            <TrendingUp size={18} />
            Track Progress
          </button>

          <button type="button" onClick={() => navigate("/evaluations")}>
            <ClipboardCheck size={18} />
            Evaluations
          </button>

          <button type="button" onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>Track Progress</h1>
            <p>Select a student to assign and monitor tasks.</p>
          </div>

          {/* Student Cards */}
          <div className="stats-grid">
            {approvedStudents.map((student) => (
              <div
                key={student.id}
                className="stat-card"
                style={{
                  cursor: "pointer",
                  border:
                    selectedStudent?.email === student.email
                      ? "2px solid blue"
                      : "1px solid #ddd",
                }}
                onClick={() => {
                  setSelectedStudent(student);
                  loadData();
                }}
              >
                <h3>{student.name}</h3>
                <p>{student.email}</p>
                <p>{getProgress(student.email)}% Completed</p>
              </div>
            ))}
          </div>

          {/* Task Panel */}
          {selectedStudent && (
            <div className="progress-card" style={{ marginTop: "30px" }}>
              <h3>{selectedStudent.name}</h3>
              <p>{selectedStudent.internshipTitle}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgress(selectedStudent.email)}%`,
                  }}
                ></div>
              </div>

              {/* Add Task */}
              <div style={{ marginTop: "20px" }}>
                <input
                  type="text"
                  placeholder="Enter new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />

                <br />

                <label>Upload File (Optional)</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                  }
                />

                {selectedFile && <p>{selectedFile.name}</p>}

                <button
                  type="button"
                  className="quick-action primary"
                  style={{ marginTop: "10px" }}
                  onClick={handleAddTask}
                >
                  Assign Task
                </button>
              </div>

              {/* Show Tasks */}
              {getStudentTasks(selectedStudent.email)?.tasks?.map(
                (task) => (
                  <div
                    key={task.id}
                    className="dashboard-card"
                    style={{ marginTop: "15px" }}
                  >
                    <h4>{task.title}</h4>
                    <p>Status: {task.status}</p>

                    {/* Admin Assigned File */}
                    {task.fileData && (
                      <a
                        href={task.fileData}
                        download={task.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📎 Download Assigned File
                      </a>
                    )}

                    {/* Student Submission */}
                    {task.submission && (
                      <div
                        style={{
                          marginTop: "10px",
                          background: "#f5f5f5",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p>
                          <strong>Description:</strong>{" "}
                          {task.submission.description}
                        </p>

                        {task.submission.fileData && (
                          <a
                            href={task.submission.fileData}
                            download={task.submission.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📎 Download Student Submission
                          </a>
                        )}

                        <br />
                        <small>
                          Submitted At:{" "}
                          {task.submission.submittedAt}
                        </small>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default TrackProgress;