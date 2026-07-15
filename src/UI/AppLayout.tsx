import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="main">
      <NavBar />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
