/* eslint-disable @typescript-eslint/no-unused-vars */
import { spawn } from "child_process";
import { LanguageMap } from "../constants/LanguageMap";
import path from "path";
import os from "os";
interface CompilationResult {
  status: "success" | "error";
  message: string;
}

export const compileProgram = async ({
  sourceFileName,
  languageCode,
  targetFileName,
}: {
  sourceFileName: string;
  languageCode: string;
  targetFileName: string;
}): Promise<CompilationResult> => {
  const filePath = path.join(os.tmpdir(), "compile-box");
  const { compileCommand } = LanguageMap[languageCode];

  return new Promise((resolve) => {
    const args: string[] = [sourceFileName];
    if (languageCode === "cpp" || languageCode === "c") {
      // Essential: tell the compiler what to name the output
      args.push("-o", targetFileName);
    }

    const compileProcess = spawn(compileCommand, args, {
      shell: true,
      cwd: filePath,
    });

    let output = "";
    compileProcess.stdout.on("data", (data) => {
      output += data;
    });
    let errors = "";
    compileProcess.stderr.on("data", (data) => {
      errors += data;
    });

    compileProcess.on("exit", (code) => {
      if (code === 0) {
        resolve({ status: "success", message: "Compilation successful" });
      } else {
        resolve({ status: "error", message: JSON.stringify(errors) });
      }
    });

    compileProcess.on("error", (err) => {
      resolve({ status: "error", message: JSON.stringify(err) });
    });
  });
};
