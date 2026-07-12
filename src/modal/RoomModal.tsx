import "../styles/RoomModal.css";
import { IoClose } from "react-icons/io5";
type RoomModalProps = {
  onClose: () => void;
};

function RoomModal({ onClose }: RoomModalProps) {
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
            <input type="text" placeholder="Enter room name" />

            <label>Description</label>
            <textarea rows={4} placeholder="Room description (optional)" />

            <label>Password</label>
            <input type="password" placeholder="Room password" />

            <label>Language</label>

            <select>
              <option>C++</option>
              <option>Java</option>
              <option>Python</option>
              <option>JavaScript</option>
            </select>

            <label>Theme</label>

            <select>
              <option>Dark</option>
              <option>Light</option>
            </select>

            <button className="primary-btn">Create Room</button>
          </div>

          {/* JOIN ROOM */}

          <div className="room-section">
            <h2>Join Room</h2>

            <p>Join an existing coding room.</p>

            <label>Room Name</label>
            <input type="text" placeholder="Enter room name" />

            <label>Password</label>
            <input type="password" placeholder="Room password" />

            <label>Username</label>
            <input type="text" placeholder="Enter your name" />

            <button className="primary-btn green">Join Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomModal;
