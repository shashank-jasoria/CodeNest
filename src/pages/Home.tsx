import CodeType from "../UI/CodeType";
import LanduageSelectionMenu from "../UI/LanduageSelectionMenu";
import "./../styles/home.css";

import Heading from "../UI/Heading";
import { useState } from "react";
import { supportedLanguages } from "../data/LanguageConfig";
import { useNavigate } from "react-router-dom";
import RoomModal from "../modal/RoomModal";

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[0],
  );
  const [showRoomModal, setShowRoomModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="main-body">
        <Heading />
        <LanduageSelectionMenu
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <div className="code-options">
          <CodeType
            imgSrc="./boy.png"
            heading="Code Alone"
            subHeading="Write and run your code independently"
            buttonText="Start Coding"
            buttonClassName="primary mn-width"
            handleClick={() =>
              navigate(`/codeArea/${selectedLanguage.languageCode}`)
            }
          />
          <CodeType
            imgSrc="./team.png"
            heading="Code with a Friend"
            subHeading="Create or join a room to code together in real-time"
            buttonText="create / Join Room"
            buttonClassName="primary room-btn"
            handleClick={() => setShowRoomModal(true)}
          />
        </div>
      </div>
      {showRoomModal && <RoomModal onClose={() => setShowRoomModal(false)} />}
    </>
  );
}

export default Home;
