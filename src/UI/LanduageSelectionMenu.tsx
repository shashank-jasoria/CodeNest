import React from "react";
import { supportedLanguages } from "../data/LanguageConfig";

interface Props {
  selectedLanguage: (typeof supportedLanguages)[number];
  setSelectedLanguage: React.Dispatch<
    React.SetStateAction<(typeof supportedLanguages)[number]>
  >;
}

export default function LanduageSelectionMenu({
  selectedLanguage,
  setSelectedLanguage,
}: Props) {
  return (
    <div className="language-container">
      <div className="language-top">
        <div className="language-header">
          <div>Choose a Language to Start Coding</div>
          <div className="leanguage-searchbar"></div>
        </div>

        <div className="language-body">
          <div className="language-body">
            {supportedLanguages.map((lang) => (
              <div
                key={lang.languageCode}
                className={`language-box ${
                  selectedLanguage.languageCode === lang.languageCode
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedLanguage(lang)}
              >
                <img
                  src={`./${lang.languageCode}.png`}
                  alt=""
                  className="language-icon"
                />
                <div className="language-text"></div>
                {lang.language}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="language-footer">
        <div className="language-footer_icon"></div>
        <div className="languager-footer_text">
          More languages are coming soon...
        </div>
      </div>
    </div>
  );
}
