import React from "react";
import "./../styles/heading.css";
import { IoCodeSlashOutline } from "react-icons/io5";
// import { Link } from "react-router-dom"
export default function Heading() {
  return (
    <div className="container">
      <div className="heading">
        <div className="main-text">
          <span className="lg-text">Welcome</span>&nbsp;to&nbsp;
          <span className="lg-text name-heading">CodeNest</span>
        </div>
        <div className="support-text">
          Write, Compile and Collaborate in real-time
        </div>
      </div>
      <div className="button-box">
        <IoCodeSlashOutline color="var(--primary)" />
        <div className="button-text">Got ot Editor</div>
      </div>
    </div>
  );
}
