/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@monaco-editor/react";
import "./../styles/CodeArea.css";
import { HouseDoorFill } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { supportedLanguages } from "./LanguageConfig";
import { useRef, useState } from "react";

function NavBar({
  selectedLanguage,
  onRunButtonClick,
  isRunning,
}: {
  selectedLanguage: string;
  onRunButtonClick: () => void;
  isRunning: boolean;
}) {
  return (
    <div id="navBar">
      <div>
        <Link to="/">
          <button type="button" className="btn btn-primary btn-lg home-btn">
            <HouseDoorFill />
          </button>
        </Link>
        <span className="codeAreaDescription ms-4">
          CodeNest :::: {selectedLanguage}
        </span>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg run-btn"
          onClick={onRunButtonClick}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}

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

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

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
    <div className="code-area">
      <div className="code-editor">
        <NavBar
          selectedLanguage={defaultConfig?.language || ""}
          onRunButtonClick={compileAndRun}
          isRunning={isRunning}
        />
        <Editor
          height="92vh"
          defaultLanguage={defaultConfig?.languageCode || ""}
          defaultValue={defaultConfig?.boilerPlateCode || ""}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="code-terminal">
        <h5 className="programOutput d-flex align-items-center justify-content-center mb-3">
          Program Output
        </h5>
        <pre className="ms-3">{terminalMessage}</pre>
      </div>
    </div>
  );
}

export default CodeArea;
