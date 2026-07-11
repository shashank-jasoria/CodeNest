export const LanguageMap: Record<
  string,
  { compileCommand: string; runCommand: string; runArgs: string[] }
> = {
  cpp: {
    compileCommand: "g++",
    runCommand: "./program", //"a.exe",
    runArgs: [],
  },
  java: {
    compileCommand: "javac",
    runCommand: "java",
    runArgs: [],
  },
  python: {
    compileCommand: "",
    runCommand: "python3", //`C:/Python314/python.exe`,
    runArgs: [],
  },
};
