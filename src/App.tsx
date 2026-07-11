import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeArea from "./pages/CodeArea";
import AppLayout from "./UI/AppLayout";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/codeArea/:language" element={<CodeArea />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
