import '../Styles/Homestyling.css'
import { motion } from "framer-motion";
import { Briefcase, ClipboardCheckIcon, ClipboardList, Database, GlobeIcon, MessageSquare, MessagesSquareIcon, User } from "lucide-react";


const Home = () => {
  const features = [
    {
      title: "Post Internship Opportunities",
      description:
        "Admins can create and manage internship openings with detailed descriptions.",
      icon: <Briefcase size={40} />,
      Link: "/pio",
    },
    {
        title: "Progress Report",
        description: "Track and view progress reports for internships.",
        icon: <ClipboardCheckIcon size={40} />,
        Link: "/progress",
    },
    {
        title: "Mentor Feedback",
        description:
        "Mentors review performance and provide structured evaluation reports.",
        icon: <MessageSquare size={40} />,
        Link: "/mentor",
    },
    {
        title: "Profile Management",
        description:
        "Users maintain profiles, internship history, and submissions in one place.",
        icon: <User size={40} />,
        Link: "/profileinfo",
    },
    {
      title: "Apply & Track Tasks",
      description:
        "Students can apply, view assigned tasks, and monitor progress easily.",
        icon: <ClipboardList size={40} />,
        Link: "/tasks",
    },
    {
        title: "Centralized Internship Management",
        description:
        "Stores all internship details in one platform and Employers can post, update, and manage opportunities easily",
        icon: <Database size={40} />,
        Link: "/management",
    },
    {
        title:"Communication & Notifications",
        description:"Built-in messaging and notifications keep everyone informed and connected.",
        icon: <MessagesSquareIcon size={40} />,
        Link: "/messages",
    },
    {
        title:"Remote Accessibility",
        description:"Access the platform from anywhere, enabling seamless remote internship management.",
        icon:<GlobeIcon size={40} />,
        Link: "/remote",
    },
  ];

  return (
    <div className="page">
        <div className="headermain,text">
            <h1>Remote Internship Management</h1>
            <p>Track · Evaluate · Succeed</p>
        </div>
        <div className="grid">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="card">
                  <a href={f.Link} key={i} className="card-link">
                    <div className="icon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </a>
              </motion.div>
            ))}
        </div>
        <div>
        </div>
    </div>
  );
};

export default Home;

