import "../Styles/Homestyling.css";
import { motion } from "framer-motion";
import {
  Briefcase,
  ClipboardCheckIcon,
  ClipboardList,
  Database,
  MessageSquare,
  User,
  Zap,
  BarChart3,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer"; // adjust path if needed

const Home = () => {
  const features = [
    {
      title: "Post Internship Opportunities",
      description: "Create and manage detailed internship listings.",
      icon: <Briefcase size={40} />,
      link: "/pio",
    },
    {
      title: "Progress Report",
      description: "Track intern performance and task completion.",
      icon: <ClipboardCheckIcon size={40} />,
      link: "/progress",
    },
    {
      title: "Mentor Feedback",
      description: "Provide structured evaluation and insights.",
      icon: <MessageSquare size={40} />,
      link: "/mentor",
    },
    {
      title: "Profile Management",
      description: "Maintain records and internship history.",
      icon: <User size={40} />,
      link: "/profileinfo",
    },
    {
      title: "Apply & Track Tasks",
      description: "Apply for internships and manage assigned tasks.",
      icon: <ClipboardList size={40} />,
      link: "/tasks",
    },
    {
      title: "Centralized Management",
      description: "Control everything from one platform.",
      icon: <Database size={40} />,
      link: "/management",
    },
  ];

  return (
    <>
      <div className="home-wrapper">

        {/* HERO */}
        <section className="hero">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Remote Internship <br />
            <span>Management Platform</span>
          </motion.h1>

          <p className="hero-sub">
            Connect employers and students seamlessly. Track progress,
            manage tasks, and evaluate performance — all in one powerful platform.
          </p>

          <div className="hero-buttons">
            <Link to="/login" state={{ role: "student" }}>
              <button className="primary-btn">Start as Student</button>
            </Link>
            <Link to="/login" state={{ role: "admin" }}>
              <button className="secondary-btn">Employer Access</button>
            </Link>
          </div>
        </section>

        {/* WHY SECTION */}
        <section className="why">
          <h2 className="section-title">Why Choose InternHub?</h2>
          <p className="section-sub">
            Everything you need to manage successful remote internship programs
          </p>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon blue">
                <Zap size={26} />
              </div>
              <h3>Real-Time Collaboration</h3>
              <p>Instant communication between mentors and interns.</p>
            </div>

            <div className="why-card">
              <div className="why-icon purple">
                <BarChart3 size={26} />
              </div>
              <h3>Advanced Analytics</h3>
              <p>Track progress with structured performance insights.</p>
            </div>

            <div className="why-card">
              <div className="why-icon green">
                <ShieldCheck size={26} />
              </div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security with full data protection.</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <h2 className="section-title">Platform Features</h2>

          <div className="features-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
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

        {/* HOW IT WORKS */}
        <section className="how">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">
            Simple, efficient process from application to completion
          </p>

          <div className="how-grid">
            <div>
              <span>1</span>
              <h4>Sign Up</h4>
              <p>Create your account</p>
            </div>

            <div>
              <span>2</span>
              <h4>Connect</h4>
              <p>Post or apply for internships</p>
            </div>

            <div>
              <span>3</span>
              <h4>Collaborate</h4>
              <p>Work together on tasks</p>
            </div>

            <div>
              <span>4</span>
              <h4>Succeed</h4>
              <p>Complete and grow</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Ready to Transform Your Internship Experience?</h2>
          <Link to="/register">
            <button className="primary-btn">Get Started</button>
          </Link>
        </section>

      </div>
    </>
  );
};

export default Home;