/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Editor from "@monaco-editor/react";
import TitleBar from "./TitleBar";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import * as monaco from "monaco-editor";
export interface CodeInputRef {
  clearCode: () => void;
  copyCode: () => void;
  getValue: () => string;
  setValue: (code: string) => void;
}

interface CodeInputProps {
  defaultConfig?: any;
  language?: string;
  onCodeChange?: (code: string) => void;
}

const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(
  ({ defaultConfig, language, onCodeChange }, ref) => {
    const { theme } = useTheme();
    const editorRef = useRef<any>(null);
    const isRemoteUpdate = useRef(false);
    const [code, setCode] = useState(defaultConfig.boilerPlateCode);
    useEffect(() => {
      if (!editorRef.current) return;

      // Change syntax highlighting
      const model = editorRef.current.getModel();

      if (model) {
        monaco.editor.setModelLanguage(model, defaultConfig.languageCode);
      }

      // Load new boilerplate
      editorRef.current.setValue(defaultConfig.boilerPlateCode);
    }, [defaultConfig]);

    function handleEditorDidMount(editor: any) {
      editorRef.current = editor;
    }

    useImperativeHandle(ref, () => ({
      clearCode() {
        editorRef.current?.setValue(defaultConfig?.boilerPlateCode || "");
      },

      copyCode: async () => {
        const code = editorRef.current?.getValue() || "";

        try {
          await navigator.clipboard.writeText(code);
          toast.success("Code copied to clipboard!");
        } catch {
          toast.error("Failed to copy code.");
        }
      },

      getValue() {
        return editorRef.current?.getValue() || "";
      },
      setValue(code: string) {
        isRemoteUpdate.current = true;
        editorRef.current?.setValue(code);
      },
    }));

    return (
      <div className="codeInput-box">
        <TitleBar language={language} />
        <Editor
          height="78vh"
          theme={theme === "dark" ? "vs-dark" : "vs"}
          language={defaultConfig?.languageCode}
          value={code}
          onMount={handleEditorDidMount}
          onChange={(value) => {
            const newCode = value ?? "";

            setCode(newCode);

            if (isRemoteUpdate.current) {
              isRemoteUpdate.current = false;
              return;
            }

            onCodeChange?.(newCode);
          }}
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
  },
);

export default CodeInput;
