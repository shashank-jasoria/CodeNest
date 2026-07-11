export const supportedLanguages = [
  {
    language: "C++",
    languageCode: "cpp",
    isCompiled: true,
    sourceFileName: "Main.cpp",
    targetFileName: "a.exe",
    boilerPlateCode:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout<<"Hello, World!";\n\treturn 0;\n}',
  },
  {
    language: "Java",
    languageCode: "java",
    isCompiled: true,
    sourceFileName: "Main.java",
    targetFileName: "Main",
    boilerPlateCode:
      'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
  },
  {
    language: "Python",
    languageCode: "python",
    isCompiled: false,
    sourceFileName: "Main.py",
    boilerPlateCode: 'print("Hello, World!")',
  },
];
