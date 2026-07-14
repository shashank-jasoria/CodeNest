import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export default function CollaborativeEditor() {
  const { roomName } = useParams<{ roomName: string }>();
  const socketRef = useRef<Socket>();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null); // your code editor instance (Monaco, CodeMirror, etc.)
  const [code, setCode] = useState("");
  const runcode = () => {
    console.log(code);
  };
  useEffect(() => {
    socketRef.current = io("http://localhost:3300");
    const socket = socketRef.current;

    socket.emit("join-room", { roomName });

    socket.on("room-joined", ({ code }) => {
      setCode(code);
      if (editorRef.current) {
        editorRef.current.setValue(code);
      }
    });

    socket.on("code-update", ({ code }) => {
      setCode(code);

      if (editorRef.current) {
        const cursor = editorRef.current.getPosition();

        editorRef.current.setValue(code);

        if (cursor) {
          editorRef.current.setPosition(cursor);
        }
      }
    });

    return () => {
      socket.emit("leave-room", { roomName });
      socket.disconnect();
    };
  }, [roomName]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined) return;

    setCode(newCode);

    socketRef.current?.emit("code-change", {
      roomName,
      code: newCode,
    });
  };

  return (
    <div>
      <h2>Room: {roomName}</h2>
      <Editor
        value={code}
        onChange={handleCodeChange}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
      <button onClick={runcode}>Run</button>
      {/* Your terminal output */}
    </div>
  );
}
