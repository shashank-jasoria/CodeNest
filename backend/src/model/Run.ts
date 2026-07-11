import { LanguageMap } from "../constants/LanguageMap";
import { spawn } from "child_process";
import fs from "fs-extra";

interface RunResult {
  status: "success" | "error";
  message: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const runProgram = async ({
  languageCode,
}: {
  runFile: string;
  languageCode: string;
}): Promise<RunResult> => {
  const filePath = `${__dirname}/../../box`;
  const { runCommand, runArgs } = LanguageMap[languageCode];

  return new Promise((resolve) => {
    const runnerProcess = spawn(runCommand, [...runArgs], {
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
    const filePath = `${__dirname}/../../box/`;
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
