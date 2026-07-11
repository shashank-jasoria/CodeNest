import { supportedLanguages } from "../data/LanguageConfig";

type TitleBarProps = {
  language?: string;
};

export default function TitleBar({ language }: TitleBarProps) {
  const defaultConfig = supportedLanguages.find((languageConfig) => {
    if (languageConfig.languageCode === language) {
      return languageConfig;
    }
  });

  return (
    <div className="editor-header">
      <div className="file-name">
        <div className="active-file"></div> {defaultConfig?.sourceFileName}
      </div>
    </div>
  );
}
