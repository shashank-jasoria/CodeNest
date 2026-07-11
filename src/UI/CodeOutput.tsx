import { FaRegTrashCan } from "react-icons/fa6";
export default function CodeOutput({
  terminalMessage,
}: {
  terminalMessage?: string;
}) {
  return (
    <div className="code-terminal">
      <div className="terminal-header">
        <div className="terminal-header-text">Output</div>
        <div className="terminal-header-button">
          <div className="terminal-btn-icon">
            <FaRegTrashCan />
          </div>
          <div className="terminal-btn-text">Clear Output</div>
        </div>
      </div>
      <div className="terminal-body">{terminalMessage}</div>
      {/* <pre className="ms-3"></pre> */}
    </div>
  );
}
