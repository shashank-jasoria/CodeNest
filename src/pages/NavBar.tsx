import React from "react";
import "./../styles/NavBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { IoCodeSlashOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";

export default function NavBar() {
  return (
    <div className="navBody card">
      <div className="nav-heading">
        <div className="nav-heading_img">
          <IoCodeSlashOutline />
        </div>
        <div className="nav-heading_text">CodeNest</div>
      </div>
      <div className="nav-container">
        <div className="nav-options">
          <div className="options">
            <div className="options-img">
              <AiOutlineHome />
            </div>
            <div className="options-text">Home</div>
          </div>
          <div className="options">
            <div className="options-img">
              <IoCodeSlashOutline />
            </div>
            <div className="options-text">Editor</div>
          </div>
          <div className="options">
            <div className="options-img">
              <BsPeople />
            </div>
            <div className="options-text">Rooms</div>
          </div>
          <div className="options">
            <div className="options-img">
              <BsExclamationCircle />
            </div>
            <div className="options-text">About</div>
          </div>
        </div>
        <div className="nav-footer">
          <div className="nav-footer_img">
            <img src="./nav_img.png" alt="" className="nav_img" />
          </div>
          <div className="nav-footer_text">
            <div className="footer-heading">Code together in real-time</div>
            <div className="footer-sub_heading">
              create a room and invite your friend to code together
            </div>
          </div>
          <div className="nav-footer-button">
            <button className="primary">Create Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}
