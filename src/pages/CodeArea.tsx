/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "./../styles/CodeArea.css";
import { useParams } from "react-router-dom";
import { supportedLanguages } from "../data/LanguageConfig";
import { useEffect, useState } from "react";
import TopBar from "../UI/TopBar";
import { useRef } from "react";
import CodeInput from "./../UI/CodeInput";
import CodeOutput from "../UI/CodeOutput";
import { io, Socket } from "socket.io-client";
import API_BASE from "../config/apiconfig";
import { toast } from "react-toastify";

function CodeArea() {
  const [terminalMessage, setTerminalMessage] = useState("Press Run Button!");
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState("");
  const { language, roomName } = useParams();
  const isCollaborative = Boolean(roomName);
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!isCollaborative || !roomName) return;
    socketRef.current = io(API_BASE);
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
      setCode(code || config?.boilerPlateCode || "");
    });

    socketRef.current.on("code-update", ({ code }) => {
      setCode(code);
    });

    return () => {
      socketRef.current?.emit("leave-room", {
        roomName,
      });

      socketRef.current?.disconnect();
    };
  }, [isCollaborative, roomName]);

  const [selectedLanguage, setSelectedLanguage] = useState(
    supportedLanguages[0],
  );
  useEffect(() => {
    if (!roomName && language) {
      const lang = supportedLanguages.find((l) => l.languageCode === language);

      if (lang) setSelectedLanguage(lang);
    }
  }, [language, roomName]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    if (!isCollaborative) return;

    socketRef.current?.emit("code-change", {
      roomName,
      code: newCode,
    });
  };

  const handleLanguageChange = (code: string) => {
    const lang = supportedLanguages.find((l) => l.languageCode === code);

    if (lang) {
      setSelectedLanguage(lang);
    }
  };

  const compileAndRun = async () => {
    setIsRunning(true);
    setTerminalMessage("Loading...");
    const {
      language,
      languageCode,
      isCompiled,
      sourceFileName,
      targetFileName,
    } = selectedLanguage || {};
    const response = await fetch(`${API_BASE}/compileAndRun`, {
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
        onClear={() => setCode(selectedLanguage.boilerPlateCode)}
        onCopy={async () => {
          try {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied to clipboard!");
          } catch {
            toast.error("Failed to copy code.");
          }
        }}
        onLanguageChange={handleLanguageChange}
      />
      <div className="process">
        <CodeInput
          code={code}
          setCode={setCode}
          defaultConfig={selectedLanguage}
          onCodeChange={handleCodeChange}
        />
        <CodeOutput terminalMessage={terminalMessage} />
      </div>
    </div>
  );
}

export default CodeArea;
