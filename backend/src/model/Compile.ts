/* eslint-disable @typescript-eslint/no-unused-vars */
import { spawn } from "child_process";
import { LanguageMap } from "../constants/LanguageMap";

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
  const filePath = `${__dirname}/../../box`;
  const { compileCommand } = LanguageMap[languageCode];
  return new Promise((resolve) => {
    const compileProcess = spawn(compileCommand, [sourceFileName], {
      shell: true,
      cwd: filePath,
    });

    let output: string = "";
    compileProcess.stdout.on("data", (data) => {
      output += data;
    });
    let errors = "";
    compileProcess.stderr.on("data", (data) => {
      errors += data;
    });

    compileProcess.on("exit", (code) => {
      if (code === 0) {
        resolve({
          status: "success",
          message: `Compilation successful`,
        });
      } else {
        resolve({
          status: "error",
          message: JSON.stringify(errors),
        });
      }
    });

    compileProcess.on("error", (err) => {
      resolve({
        status: "error",
        message: JSON.stringify(err),
      });
    });
  });
};
