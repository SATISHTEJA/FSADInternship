import "../Styles/Homestyling.css";
import { motion } from "framer-motion";
import {
  Briefcase,
  ClipboardCheckIcon,
  ClipboardList,
  Database,
  GlobeIcon,
  MessageSquare,
  MessagesSquareIcon,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Post Internship Opportunities",
      description:
        "Admins can create and manage internship openings with detailed descriptions.",
      icon: <Briefcase size={40} />,
      link: "/pio",
    },
    {
      title: "Progress Report",
      description: "Track and view progress reports for internships.",
      icon: <ClipboardCheckIcon size={40} />,
      link: "/progress",
    },
    {
      title: "Mentor Feedback",
      description:
        "Mentors review performance and provide structured evaluation reports.",
      icon: <MessageSquare size={40} />,
      link: "/mentor",
    },
    {
      title: "Profile Management",
      description:
        "Users maintain profiles, internship history, and submissions in one place.",
      icon: <User size={40} />,
      link: "/profileinfo",
    },
    {
      title: "Apply & Track Tasks",
      description:
        "Students can apply, view assigned tasks, and monitor progress easily.",
      icon: <ClipboardList size={40} />,
      link: "/tasks",
    },
    {
      title: "Centralized Internship Management",
      description:
        "Employers can post, update, and manage opportunities easily.",
      icon: <Database size={40} />,
      link: "/management",
    },
  ];

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
      <section className="hero">
        <h1 >
          Remote Internship Management
        </h1>
        <p style={{fontSize:"40px", color:"Blue"}}>Track · Evaluate · Succeed</p>
      </section>

      {/* FEATURE GRID */}
      <section className="features">
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="feature-card"
            >
              <Link to={f.link} className="feature-link">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;