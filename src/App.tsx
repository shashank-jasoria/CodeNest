import { Route, Routes } from "react-router-dom";
import "./App.css";

import LanguageSelectionPage from "./pages/LanguageSelection";
import CodeArea from "./pages/CodeArea";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LanguageSelectionPage />} />
        <Route path="/codeArea/:language" element={<CodeArea />}></Route>
      </Routes>
    </>
  );
}

export default App;
