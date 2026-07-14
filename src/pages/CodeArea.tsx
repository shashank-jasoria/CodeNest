/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./../styles/CodeArea.css";
import { useParams } from "react-router-dom";
import { supportedLanguages } from "../data/LanguageConfig";
import { useEffect, useState } from "react";
import TopBar from "../UI/TopBar";
import { useRef } from "react";
import CodeInput, { CodeInputRef } from "./../UI/CodeInput";
import CodeOutput from "../UI/CodeOutput";
import { io, Socket } from "socket.io-client";

function CodeArea() {
  // const editorRef = useRef<any>(null);
  const [terminalMessage, setTerminalMessage] = useState("Press Run Button!");
  const [isRunning, setIsRunning] = useState(false);
  const { language, roomName } = useParams();

  const isCollaborative = Boolean(roomName);
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!isCollaborative || !roomName) return;

    socketRef.current = io("http://localhost:3300");

    socketRef.current.emit("join-room", {
      roomName,
    });

    socketRef.current.on("room-joined", ({ code, language }) => {
      const config = supportedLanguages.find(
        (l) => l.languageCode === language,
      );

      if (config) {
        setSelectedLanguage(config);
      }

      editorRef.current?.setValue(code);
    });

    socketRef.current.on("code-update", ({ code }) => {
      editorRef.current?.setValue(code);
    });

    return () => {
      socketRef.current?.emit("leave-room", {
        roomName,
      });

      socketRef.current?.disconnect();
    };
  }, [isCollaborative, roomName]);

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return (
      supportedLanguages.find((lang) => lang.languageCode === language) ??
      supportedLanguages[0]
    );
  });

  const handleCodeChange = (code: string) => {
    if (!isCollaborative) return;

    socketRef.current?.emit("code-change", {
      roomName,
      code,
    });
  };

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
          onCodeChange={handleCodeChange}
        />
        <CodeOutput terminalMessage={terminalMessage} />
      </div>
    </div>
  );
}

export default CodeArea;
