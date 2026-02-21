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

  useEffect(() => {
    const apps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const approved = apps.filter(
      (app) => app.status === "Approved"
    );

    setApprovedStudents(approved);

    const storedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasksData(storedTasks);
  }, []);

  const getStudentTasks = (email) => {
    return tasksData.find((t) => t.studentEmail === email);
  };

  const getProgress = (email) => {
    const student = getStudentTasks(email);
    if (!student) return 0;

    const total = student.tasks.length;
    const completed = student.tasks.filter(
      (t) => t.status === "Completed"
    ).length;

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const handleAddTask = () => {
    if (!newTask || !selectedStudent) return;

    const allTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const index = allTasks.findIndex(
      (s) => s.studentEmail === selectedStudent.email
    );

    if (index !== -1) {
      allTasks[index].tasks.push({
        id: Date.now(),
        title: newTask,
        status: "Pending",
      });
    } else {
      allTasks.push({
        studentEmail: selectedStudent.email,
        internshipTitle: selectedStudent.internshipTitle,
        tasks: [
          {
            id: Date.now(),
            title: newTask,
            status: "Pending",
          },
        ],
      });
    }

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setTasksData(allTasks);
    setNewTask("");
  };

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/admin-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/post-internship")}>
            <FileText size={18} />
            Post Internship
          </button>

          <button onClick={() => navigate("/applications")}>
            <Users size={18} />
            Applications
          </button>

          <button className="active">
            <TrendingUp size={18} />
            Track Progress
          </button>

          <button onClick={() => navigate("/evaluations")}>
            <ClipboardCheck size={18} />
            Evaluations
          </button>

          <button onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>Track Progress</h1>
            <p>Click on an approved intern to assign tasks.</p>
          </div>

          {/* APPROVED INTERN CARDS */}
          <div className="stats-grid">
            {approvedStudents.map((student) => (
              <div
                key={student.id}
                className="stat-card"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedStudent(student)}
              >
                <div>
                  <h3>{student.fullName}</h3>
                  <p>{student.email}</p>
                  <p style={{ marginTop: "6px" }}>
                    {getProgress(student.email)}% Completed
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TASK ASSIGNMENT PANEL */}
          {selectedStudent && (
            <div className="progress-card" style={{ marginTop: "30px" }}>
              <div className="progress-top">
                <div>
                  <h3>{selectedStudent.fullName}</h3>
                  <p>{selectedStudent.internshipTitle}</p>
                </div>
                <strong>
                  {getProgress(selectedStudent.email)}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgress(
                      selectedStudent.email
                    )}%`,
                  }}
                ></div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <input
                  placeholder="Enter new task..."
                  value={newTask}
                  onChange={(e) =>
                    setNewTask(e.target.value)
                  }
                />
                <button
                  className="quick-action primary"
                  style={{ marginTop: "10px" }}
                  onClick={handleAddTask}
                >
                  Assign Task
                </button>
              </div>

              {/* SHOW EXISTING TASKS */}
              {getStudentTasks(selectedStudent.email)?.tasks.map(
                (task) => (
                  <div
                    key={task.id}
                    className="dashboard-card"
                    style={{ marginTop: "15px" }}
                  >
                    <p>{task.title}</p>
                    <small>Status: {task.status}</small>
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