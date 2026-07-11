export const LanguageMap: Record<
  string,
  { compileCommand: string; runCommand: string; runArgs: string[] }
> = {
  cpp: {
    compileCommand: "g++",
    runCommand: "a.exe",
    runArgs: [],
  },
  java: {
    compileCommand: "javac",
    runCommand: "java",
    runArgs: ["Main"],
  },
  python: {
    compileCommand: "",
    runCommand: `C:/Python314/python.exe`,
    runArgs: ["Main.py"],
  },
};
