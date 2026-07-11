import fs from "fs/promises";
import path from "path";

export const createFile = async (code: string, sourceFileName: string) => {
  try {
    const dir = path.resolve(__dirname, "../../box");
    await fs.mkdir(dir, { recursive: true }); // creates box/ if missing
    const filePath = path.join(dir, sourceFileName);
    await fs.writeFile(filePath, code, "utf8");
    return { status: "success" };
  } catch (err) {
    console.error("createFile error:", err); // log the real error
    return { status: "error" };
  }
};
