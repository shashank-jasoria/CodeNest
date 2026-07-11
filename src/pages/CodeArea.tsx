/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./../styles/CodeArea.css";
import { useParams } from "react-router-dom";
import { supportedLanguages } from "../data/LanguageConfig";
import { useRef, useState } from "react";
import TopBar from "../UI/TopBar";
import TitleBar from "../UI/TitleBar";
import CodeInput from "../UI/CodeInput";
import CodeOutput from "../UI/CodeOutput";

function CodeArea() {
  const editorRef = useRef<any>(null);
  const [terminalMessage, setTerminalMessage] = useState("Press Run Button!");
  const [isRunning, setIsRunning] = useState(false);
  const { language } = useParams();
  const defaultConfig = supportedLanguages.find((languageConfig) => {
    if (languageConfig.languageCode === language) {
      return languageConfig;
    }
  });

  const compileAndRun = async () => {
    setIsRunning(true);
    setTerminalMessage("Loading...");
    const code = editorRef.current?.getValue();
    const {
      language,
      languageCode,
      isCompiled,
      sourceFileName,
      targetFileName,
    } = defaultConfig || {};
    const response = await fetch("http://localhost:3300/compileAndRun", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        language,
        languageCode,
        isCompiled,
        sourceFileName,
        targetFileName,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    setTerminalMessage(responseData.message);
    setIsRunning(false);
  };

  return (
    <div className="code-box">
      <TopBar
        selectedLanguage={defaultConfig?.language || ""}
        onRunButtonClick={compileAndRun}
        isRunning={isRunning}
      />
      <div className="process">
        <CodeInput language={language} defaultConfig={defaultConfig || {}} />
        <CodeOutput terminalMessage={terminalMessage} />
      </div>
    </div>
  );
}

export default CodeArea;
