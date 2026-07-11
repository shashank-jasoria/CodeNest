/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import Editor, { loader } from "@monaco-editor/react";
import TitleBar from "./TitleBar";
import { useTheme } from "../context/ThemeContext";

export default function CodeInput({
  defaultConfig,
  language,
}: {
  defaultConfig?: any;
  language?: string;
}) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  return (
    <div className="codeInput-box">
      <TitleBar language={language} />
      <Editor
        height="78vh"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        defaultLanguage={defaultConfig?.languageCode || ""}
        defaultValue={defaultConfig?.boilerPlateCode || ""}
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
