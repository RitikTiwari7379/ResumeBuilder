import React, { useState } from "react";
import 'D:/Resume Builder/resume-builder/src/Resume.css';

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = () => {
  const [isCtrlDown, setIsCtrlDown] = useState(false);
  const [resumeContent] = useState({
    personalInfo: {
      tel: "(000) 000-0000",
      name: "Alex Webb",
      email: "johndoe@example.com",
      github: "github.com/alexwebbx",
      linkedin: "linkedin.com/in/alexwebb",
    },
    workExperience: [
      {
        company: "XYZ Corporation",
        position: "Senior Software Engineer",
        years: "2016 - Present",
        location: "New York",
        description:
          "  - Leading projects on AI development:\n - Developed an all-seeing AI system",
      },
      {
        company: "Universal Insurance Group",
        position: "Insurance Underwriter",
        years: "2012 - 2016",
        location: "New York",
        description:
          "-Investigated insurance claims \n-Gathered information and provided support to families",
      },
      {
        company: "ABC Tech Solutions",
        position: "Software Engineer",
        years: "2006 - 2012",
        location: "New York",
        description:
          " -Contributed to technological advancements:\n- Played a key role in coding projects",
      },
    ],
    education: {
      school: "University",
      degree: "Computer Science",
      years: "2002 - 2006",
      location: "Anytown, USA",
      highlights: ["Bachelor's Degree"],
    },
    skills: [
      {
        category: "Programming",
        details: [
          "C/C++, Java, Python",
          "Experience in building large-scale systems",
        ],
      },
      {
        category: "Finance",
        details: [
          "Knowledgeable in stock market analysis",
          "Experience in crisis management",
        ],
      },
      {
        category: "Communication",
        details: [
          "Strong interpersonal skills",
          "Ability to handle diverse situations with compassion",
        ],
      },
    ],
    coCurricular: [
      {
        activity: "Debating Club",
        position: "President",
        years: "2010 - 2011",
        description: "Led debates and organized club activities.",
      },
      {
        activity: "Community Service Club",
        position: "Volunteer",
        years: "2009 - 2010",
        description: "Participated in various community service events.",
      },
    ],
  });

  const handleKeyDown = (e) => {
    if (e.key === "Control") {
      setIsCtrlDown(true);
    }
    if (isCtrlDown && e.key === "p") {
      e.preventDefault();
      handlePrint();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Control") {
      setIsCtrlDown(false);
    }
  };

  const handlePrint = () => {
    html2canvas(document.querySelector("article")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("resume.pdf");
    });
  };

  return (
    <section
      className="resume-section"
      style={{
        borderRadius: "4px",
        boxShadow: "gray 1px 1px 3px 2px",
        overflow: "hidden",
      }}
    >
      <div id="addDropBtn" tabIndex="-1">
        <div id="dropBtn" onClick={handlePrint}>
          Download PDF
        </div>
      </div>
      <article
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex="0"
        contentEditable="true"
      >
        <table className="psnl-info">
          <tbody>
            <tr>
              <td rowSpan="2" className="text-left">
                Tel: {resumeContent.personalInfo.tel}
              </td>
              <td className="text-center font-20">
                {resumeContent.personalInfo.name}
              </td>
              <td rowSpan="2" className="text-right">
                email: {resumeContent.personalInfo.email}
              </td>
            </tr>
            <tr>
              <td className="text-center font-20">
                {resumeContent.personalInfo.nickname}
              </td>
            </tr>
            {/* Add LinkedIn */}
            <tr>
              <td colSpan="3" className="text-center font-16">
                LinkedIn: <a href={resumeContent.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{resumeContent.personalInfo.linkedin}</a>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Work Experience */}
        <div className="rsm-header">
          <h2>Work Experience</h2>
          <hr />
        </div>
        {resumeContent.workExperience.map((exp, index) => (
          <div className="rsm-cmpnt" key={index}>
            <div className="rsm-cmpnt-top">
              <div className="text-left">
                <div>{exp.company}</div>
                <div>{exp.position}</div>
              </div>
              <div className="text-right font-10">
                <div>{exp.years}</div>
                <div>{exp.location}</div>
              </div>
            </div>
            <div className="rsm-cmpnt-mid">
              {exp.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {/* Education */}
        <div className="rsm-header">
          <h2>Education</h2>
          <hr />
        </div>
        <div className="rsm-cmpnt">
          <div className="rsm-cmpnt-top">
            <div className="text-left">
              <div>{resumeContent.education.school}</div>
              <div>{resumeContent.education.degree}</div>
            </div>
            <div className="text-right font-10">
              <div>{resumeContent.education.years}</div>
              <div>{resumeContent.education.location}</div>
            </div>
          </div>
          <div className="rsm-cmpnt-btm">
            <p>Education highlights:</p>
            <ul>
              {resumeContent.education.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Professional Skills */}
        <div className="rsm-header">
          <h2>Professional Skills</h2>
          <hr />
        </div>
        {resumeContent.skills.map((skill, index) => (
          <div className="rsm-cmpnt" key={index}>
            <div className="rsm-cmpnt-top">
              <div className="text-left">
                <div>{skill.category}</div>
              </div>
            </div>
            <div className="rsm-cmpnt-btm">
              {skill.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
        {/* Co-Curricular Activities */}
        <div className="rsm-header">
          <h2>Co-Curricular Activities</h2>
          <hr />
        </div>
        {resumeContent.coCurricular.map((activity, index) => (
          <div className="rsm-cmpnt" key={index}>
            <div className="rsm-cmpnt-top">
              <div className="text-left">
                <div>{activity.activity}</div>
                <div>{activity.position}</div>
              </div>
              <div className="text-right font-10">
                <div>{activity.years}</div>
              </div>
            </div>
            <div className="rsm-cmpnt-mid">
              <p>{activity.description}</p>
            </div>
          </div>
        ))}
      </article>
      <div className="resume-buttons" tabIndex="-1">
        <div className="button" onClick={handlePrint}>
          Download PDF
        </div>
      </div>
    </section>
  );
};

export default Resume;
