import CodeType from "./CodeType";
import LanduageSelectionMenu from "./LanduageSelectionMenu";
import "./../styles/LanguageSelection.css";
import NavBar from "./NavBar";
import Heading from "./Heading";
import { useState } from "react";
import { supportedLanguages } from "./LanguageConfig";
import { useNavigate } from "react-router-dom";

function LanguageSelectionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[0],
  );

  const navigate = useNavigate();

  return (
    <div className="main">
      <NavBar />
      <div className="body">
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
            buttonClassName="primary"
            handleClick={() =>
              navigate(`/codeArea/${selectedLanguage.languageCode}`)
            }
          />
          <CodeType
            imgSrc="./team.png"
            heading="Code with a Friend"
            subHeading="Create or join a room to code together in real-time"
            buttonText="create / Join Room"
            buttonClassName="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default LanguageSelectionPage;
