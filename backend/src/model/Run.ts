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
  const { runCommand } = LanguageMap[languageCode];

  // Determine the correct arguments for each language
  const args: string[] = [];

  if (languageCode === "python") {
    // Interpreted: python script.py
    args.push(runFile);
  } else if (languageCode === "java") {
    // Compiled: java ClassName
    // If runFile still has ".class" extension, remove it
    args.push(runFile.replace(/\.class$/, ""));
  } else if (languageCode === "cpp" || languageCode === "c") {
    // Compiled: runCommand is already "./program" (the executable), no arguments
    // So args remains empty
  }
  console.log("Running:", runCommand, args);
  console.log("cwd:", filePath);
  return new Promise((resolve) => {
    const runnerProcess = spawn(runCommand, args, {
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
