import { LanguageMap } from "../constants/LanguageMap";
import { spawn } from "child_process";
import fs from "fs-extra";
import os from "os";
import path from "path";
interface RunResult {
  status: "success" | "error";
  message: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const runProgram = async ({
  runFile,
  languageCode,
}: {
  runFile: string;
  languageCode: string;
}): Promise<RunResult> => {
  const filePath = path.join(os.tmpdir(), "compile-box");
  let command: string;
  let args: string[] = [];

  if (languageCode === "python") {
    command = "python3"; // or "python", adjust if needed
    args = [runFile];
  } else if (languageCode === "java") {
    command = "java";
    args = [runFile.replace(/\.class$/, "")];
  } else if (languageCode === "cpp" || languageCode === "c") {
    if (process.platform === "win32") {
      command = runFile + ".exe";
    } else {
      command = "./" + runFile;
    }
  } else {
    const { runCommand } = LanguageMap[languageCode];
    command = runCommand;
    args = [runFile];
  }

  return new Promise((resolve) => {
    const runnerProcess = spawn(command, args, {
      shell: true,
      cwd: filePath,
    });

    let output = "";
    runnerProcess.stdout.on("data", (data) => {
      output += data;
    });

    let errors = "";
    runnerProcess.stderr.on("data", (data) => {
      errors += data;
    });

    const timeoutId = setTimeout(() => {
      runnerProcess.kill();
      resolve({ message: "Execution Took Too Long", status: "error" });
    }, 15000);

    runnerProcess.on("exit", (code) => {
      clearTimeout(timeoutId);
      runnerProcess.on("close", () => {
        resolve({
          message: code === 0 ? output : JSON.stringify(errors),
          status: code === 0 ? "success" : "error",
        });
      });
    });

    runnerProcess.on("error", (err) => {
      clearTimeout(timeoutId);
      resolve({
        status: "error",
        message: JSON.stringify(err),
      });
    });
  });
};

export const clearBoxFiles = async () => {
  try {
    const filePath = path.join(os.tmpdir(), "compile-box");
    await fs.emptyDir(filePath);
    return {
      status: "success",
    };
  } catch (err) {
    return {
      status: "error",
    };
  }
};
