import { Link } from "react-router-dom";
import "./../styles/topBar.css";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiOutlinePlay } from "react-icons/hi2";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
export default function TopBar({
  selectedLanguage,
  onRunButtonClick,
  isRunning,
}: {
  selectedLanguage: string;
  onRunButtonClick: () => void;
  isRunning: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="topBar">
      <Link className="topBar-logobox" to="/">
        <div className="main-text nav-heading_img">
          <IoCodeSlashOutline />
        </div>
        <div className="lg-text topBar-text ">
          Code<span className="name-heading">Nest</span>
        </div>
      </Link>
      <div className="middle-part">
        <select className="topBar-dropdown ">
          <option selected>{selectedLanguage}</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
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
      </div>
      <div className="right-part">
        <div className="top-bar_btn">
          <div className="top_btn-img">
            <FaRegTrashCan />
          </div>
          <div className="top_btn-text">Clear</div>
        </div>
        <div className="top-bar_btn">
          <div className="top_btn-img">
            <MdOutlineContentCopy />
          </div>
          <div className="top_btn-text">Copy Code</div>
        </div>
        <button
          type="button"
          className="primary run-btn"
          onClick={onRunButtonClick}
          disabled={isRunning}
        >
          <HiOutlinePlay />
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}

{
  /*  */
}
