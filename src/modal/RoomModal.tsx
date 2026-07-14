import "../styles/RoomModal.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { supportedLanguages } from "../data/LanguageConfig";
import { useTheme } from "../context/ThemeContext";
import API_BASE from "../config/apiconfig";
type RoomModalProps = {
  onClose: () => void;
};

function RoomModal({ onClose }: RoomModalProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Create Room
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState(supportedLanguages[0].languageCode);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Join Room
  const [joinName, setJoinName] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE}/createRoom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          password,
          language,
          theme: selectedTheme,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      navigate(`/room/${name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = async () => {
    try {
      const res = await fetch(`${API_BASE}/joinRoom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: joinName,
          password: joinPassword,
          userName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      navigate(`/room/${joinName}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="room-modal card">
        <button className="close-btn" onClick={onClose}>
          <IoClose />
        </button>

        <div className="room-modal-grid">
          {/* CREATE ROOM */}
          <div className="room-section">
            <h2>Create Room</h2>
            <p>Create a coding room and invite your friend.</p>

            <label>Room Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter room name"
            />

            <label>Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Room description (optional)"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Room password"
            />

            <label>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.languageCode} value={lang.languageCode}>
                  {lang.language}
                </option>
              ))}
            </select>

            <label>Theme</label>
            <select
              value={selectedTheme}
              onChange={(e) =>
                setSelectedTheme(e.target.value as "light" | "dark")
              }
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>

            <button className="primary-btn" onClick={handleSubmit}>
              Create Room
            </button>
          </div>

          {/* JOIN ROOM */}
          <div className="room-section">
            <h2>Join Room</h2>
            <p>Join an existing coding room.</p>

            <label>Room Name</label>
            <input
              type="text"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              placeholder="Enter room name"
            />

            <label>Password</label>
            <input
              type="password"
              value={joinPassword}
              onChange={(e) => setJoinPassword(e.target.value)}
              placeholder="Room password"
            />

            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />

            <button className="primary-btn green" onClick={handleJoin}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomModal;
