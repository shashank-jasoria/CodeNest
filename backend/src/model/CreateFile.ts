import fs from "fs/promises";
import path from "path";
import os from "os";
export const createFile = async (code: string, sourceFileName: string) => {
  try {
    const dir = path.join(os.tmpdir(), "compile-box");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, sourceFileName);
    await fs.writeFile(filePath, code, "utf8");
    return { status: "success" };
  } catch (err) {
    console.error("createFile error:", err);
    return { status: "error" };
  }
};
