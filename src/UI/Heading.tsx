import "./../styles/heading.css";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
// import { Link } from "react-router-dom"
export default function Heading({ handleClick }: { handleClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();
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
      <div className="header-leftPart">
        <div className="mg-left">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />

          <label htmlFor="checkbox" className="label">
            <FaMoon />
            <FaRegSun />
            <div className="ball"></div>
          </label>
        </div>
        <div className="button-box" onClick={handleClick}>
          <IoCodeSlashOutline color="var(--primary)" />
          <div className="button-text">Got ot Editor</div>
        </div>
      </div>
    </div>
  );
}
