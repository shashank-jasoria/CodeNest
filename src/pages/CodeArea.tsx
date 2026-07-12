/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./../styles/CodeArea.css";
import { useParams } from "react-router-dom";
import { supportedLanguages } from "../data/LanguageConfig";
import { useState } from "react";
import TopBar from "../UI/TopBar";
import { useRef } from "react";
import CodeInput, { CodeInputRef } from "./../UI/CodeInput";
import CodeOutput from "../UI/CodeOutput";

function CodeArea() {
  // const editorRef = useRef<any>(null);
  const [terminalMessage, setTerminalMessage] = useState("Press Run Button!");
  const [isRunning, setIsRunning] = useState(false);
  const { language } = useParams();

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return (
      supportedLanguages.find((lang) => lang.languageCode === language) ??
      supportedLanguages[0]
    );
  });

  const handleLanguageChange = (code: string) => {
    const lang = supportedLanguages.find((l) => l.languageCode === code);

    if (lang) {
      setSelectedLanguage(lang);
    }
  };

  const editorRef = useRef<CodeInputRef>(null);
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
    } = selectedLanguage || {};
    const response = await fetch("/compileAndRun", {
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
        selectedLanguage={selectedLanguage.languageCode}
        onRunButtonClick={compileAndRun}
        isRunning={isRunning}
        onClear={() => editorRef.current?.clearCode()}
        onCopy={() => editorRef.current?.copyCode()}
        onLanguageChange={handleLanguageChange}
      />
      <div className="process">
        <CodeInput
          ref={editorRef}
          language={selectedLanguage.language}
          defaultConfig={selectedLanguage}
        />
        <CodeOutput terminalMessage={terminalMessage} />
      </div>
    </div>
  );
}

export default CodeArea;
