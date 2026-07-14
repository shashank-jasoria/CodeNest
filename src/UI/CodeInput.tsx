/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import TitleBar from "./TitleBar";
import { useTheme } from "../context/ThemeContext";

interface CodeInputProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  defaultConfig: any;
  onCodeChange?: (code: string) => void;
}

function CodeInput({
  defaultConfig,
  code,
  setCode,
  onCodeChange,
}: CodeInputProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);
  useEffect(() => {
    setCode(defaultConfig.boilerPlateCode);
  }, [defaultConfig]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  return (
    <div className="codeInput-box">
      <TitleBar language={defaultConfig.language} />
      <Editor
        height="78vh"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        language={defaultConfig.languageCode}
        value={code}
        onChange={(value) => {
          onCodeChange?.(value ?? "");
        }}
        onMount={handleEditorDidMount}
        options={{
          fontFamily: "JetBrains Mono",
          fontSize: 15,
          fontLigatures: true,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          roundedSelection: true,
          // automaticLayout: true,
          padding: {
            top: 18,
          },
          renderLineHighlight: "none",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
}

export default CodeInput;
