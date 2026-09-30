import React from "react";
import "./Project.css";
import Header from "./Header.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Goal from "./Goal.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";


// App Component
function Project() {
  const skills = [
    "HTML & CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Git & GitHub"
  ];

  return (
    <div className="container">
      <Header
        title="Hi, I'm Jai"
        subtitle="Web Developer | React Enthusiast"
      />

      <main>
        <About
          introduction="I am a passionate web developer who enjoys creating modern,
          responsive and user-friendly websites. I love learning new
          technologies and solving real-world problems through code."
        />

        <Skills skills={skills} />

        <Goal
          objective="My career goal is to become a skilled full-stack developer
          and build innovative applications that provide meaningful
          solutions to users."
        />

        <Contact
          email="jai@example.com"
          phone="+91 98765 43210"
          github="https://github.com/"
        />
      </main>

      <Footer />
    </div>
  );
}

export default Project;