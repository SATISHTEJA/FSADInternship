import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        maxWidth: "100vw",      // ✅ Prevent overflow
        padding: "20px 15px",
        background: "White",
        color: "Black",
        fontSize: "16px",
        textAlign: "center",
        boxSizing: "border-box", // ✅ Important
        borderRadius:"10px",
      }}
    >
      © 2026 Remote Internship Platform | BABLU
    </footer>
  );
};

export default Footer;